import requests_chromium1 from "../public/data/Requests_run1/request_urls_chromium.json";
import requests_chromium2 from "../public/data/Requests_run2/request_urls_chromium.json";
import requests_chromium3 from "../public/data/Requests_run3/request_urls_chromium.json";
import requests_f1 from "../public/data/Requests_run1/request_urls_firefox.json";
import requests_f2 from "../public/data/Requests_run2/request_urls_firefox.json";
import requests_f3 from "../public/data/Requests_run3/request_urls_firefox.json";
import requests_w1 from "../public/data/Requests_run1/request_urls_webkit.json";
import requests_w2 from "../public/data/Requests_run2/request_urls_webkit.json";
import requests_w3 from "../public/data/Requests_run3/request_urls_webkit.json";

// Utility
import { getDomain } from "tldts";
import { mkdir, writeFile } from "node:fs/promises";
import Plotly from 'plotly.js-dist-min';

// Types
import type { NetResult, ResultURL, PieChartData } from "./Types";
import type { Data, Layout, Config } from 'plotly.js-dist-min';


// Types
import { Domain_entry, Domain_list } from "./Types";

/**Gets an array of Domain_lists, each one containing the unique domains that were seen in each website-browser combination's requests
 * and the count of how many times that domain appeared in the requests (used to make pie charts at the moment)
 * @param _filecontent Network requests from a given browser run
 * @param _filename name of the file being sorted through (for display)
 * @param _browser name of the browser being sorted through (for inclusion in the Domainlist, used by make_piechart_data_website)
 * @returns 
 */
function get_unique_domains(_filecontent: NetResult[], _filename:string, _browser:string): Domain_list[]{
    // make an array to hold the unique domains found
    const all_unique_domains: Domain_list[] = [];
    console.log(`Site requests for ${_filename}`);
    // for each website
    _filecontent.forEach(element => {
        // make a domain list entry for the website
        const domain_list: Domain_entry[] = [];
        // get the requests that belong to this website
        const site_urls: NetResult = element;
        // for each url
        site_urls.urls.forEach(url => {
            // get the domain of the current url
            const this_domain = getDomain(new URL(url.url).hostname) ?? "";
            // if that domain is not already in the domain list
            if(!is_in_domain_list(domain_list, this_domain)){
                // create a domain list entry
                const entry:Domain_entry = {
                    domain_name: this_domain,
                    count: 1
                }
                // add the domain to the unique domain list for this site
                domain_list.push(entry);
            }
            // otherwise
            else{
                // find the domain in the list
                domain_list.forEach(domain => {
                    // increment its count (how many times it appeared in the requests)
                    if(domain.domain_name == this_domain){
                        domain.count++;
                    }
                })
            }
        });
        // Make a domain list for the website-browser combination
        const this_list: Domain_list = {
            website: element.website,
            browser: _browser,
            domains: domain_list
        }
        // add it to the output
        all_unique_domains.push(this_list);
    });
    return all_unique_domains;
}

/**Incomplete, at the moment just prints the urls for each browser run and site combination that were marked as
 * possibly third party
 * 
 * @param _filecontent Network requests from a given browser run
 * @param _filename name of the file being sorted through (for display)
 */
function get_third_party_requests(_filecontent: NetResult[], _filename:string): void{
    console.log(`Possible Third-party requests for ${_filename}`);
    _filecontent.forEach(element => {
        const site_urls: NetResult = element;
        console.log(`For ${element.website}`);
        site_urls.urls.forEach(url => {
            if(url.thirdparty){
                console.log(url.url);
            }     
        });
        console.log("\n");
    });
}

/** Set up pie chart data for a given website run (all browsers in one PieChartData object)
 * 
 * @param _domain_list list of Domain_list objects containing unique domains for each website in the run
 * @returns PieChartData object with everything Plotly needs to plot the Pie chart
 */
function make_piechart_data_website(_domain_list:Domain_list[]): PieChartData {
    // make arrays to hold each data and layout pair for each subplot
    const all_data: Data[] = [];
    const all_layout: Partial<Layout>[] = [];
    // make PieChartData object to be output
    const output: PieChartData = {
        data: all_data,
        layout: all_layout
    }
    // track the column count (important for subplot layout)
    var colcount: number = 0;
    
    // For each browser (subplot)
    _domain_list.forEach(element => {
        // the layout will be the same, except for the name
        var layout:Partial<Layout> = {
            title: { text: element.website},
            height: 400,
            width: 800,
            margin: {"t": 30, "b": 0, "l": 60, "r": 0},
            showlegend: false,
            grid: {rows: 1, columns: 4, xgap: 0.4, subplots: ['xy','x2y','x3y','x4y'], pattern: 'independent'}
        }
        // data element is each domain name and its count
        const domains_array: string[] = [];
        const counts_array: number[] = [];
        // put together the arrays
        element.domains.forEach(domain_entry => {
            domains_array.push(domain_entry.domain_name);
            counts_array.push(domain_entry.count);
        });
        // make the Data object the Piechart will use
        const data: Data = {
            type: 'pie',
            name: element.browser,
            values: counts_array,
            labels: domains_array,
            domain: {
                row: 0,
                column: colcount
            },
        }
        // add the data and laout pair to the output
        all_data.push(data);
        all_layout.push(layout);
        // increment the column placement
        // this stops the subplots from being stacked over eachother
        colcount++;

    })
    // return the PieChartData
    return output;
}

/**Make output file for a given browser-run combination (all websites in one file)
 * 
 * @param _charts PieChartData for all runs of the given website to be added to a file
 * @param _viewname Name for the file
 */
function piechart_website_file(_charts:PieChartData[], _viewname: string): void {
    // Creates the output directory if necessary.
    mkdir("public/data_views/websites", { recursive: true });
    // Writes results to JSON.
    writeFile(`public/data_views/websites/${_viewname}.json`, JSON.stringify(_charts, null, 2), "utf-8");
}

/**Gives true/false of whether a url is in the given domain list (for counting domains that appear in a set of requests)
 * 
 * @param _domainlist List of unique domains for a given site run
 * @param _url url to be compared
 * @returns true/false of whether the url appears in the domain list
 */
function is_in_domain_list(_domainlist: Domain_entry[], _url:string): boolean{
    let is_in_list: boolean = false;

    _domainlist.forEach(domain => {
        if(!is_in_list && domain.domain_name == _url){
            is_in_list = true;
        }
    });
    return is_in_list;
}

/**Makes output file for plotting a piechart for a given browser-run combination (all websites in one piechart)
 * 
 * @param _domain_list List of unique domains for a given site run from a particular browser
 * @param _viewname Name for the output file
 */
function make_piechart_data_browser_run(_domain_list:Domain_list[], _viewname: string):void{
    const all_data: Data[] = [];
    const all_layout: Partial<Layout>[] = [];
    const output: PieChartData = {
        data: all_data,
        layout: all_layout
    }
    var rowcount: number = 0;
    _domain_list.forEach(element => {
        const domains_array: string[] = [];
        const counts_array: number[] = [];
        var layout:Partial<Layout> = {
            title: { text: element.website},
            height: 400,
            width: 400,
            margin: {"t": 0, "b": 0, "l": 0, "r": 0},
            showlegend: false
        }
        element.domains.forEach(domain_entry => {
            domains_array.push(domain_entry.domain_name);
            counts_array.push(domain_entry.count);
        })
        const data: Data = {
            type: 'pie',
            name: element.website,
            values: counts_array,
            labels: domains_array,
            domain: {
                row: 0,
                column: rowcount
            },
        }
        
        all_data.push(data);
        all_layout.push(layout);
        rowcount++;
    });
    
    // Creates the output directory if necessary.
    mkdir("public/data_views", { recursive: true });
    // Writes results to JSON.
    writeFile(`public/data_views/${_viewname}.json`, JSON.stringify(output, null, 2), "utf-8");
}

// Set up and run all the data
function list_data(): void{
    // Unique Domains for Chromium Runs
    const crun1: Domain_list[] = get_unique_domains(requests_chromium1, "Chromium Run 1", "Chromium");
    const crun2: Domain_list[] = get_unique_domains(requests_chromium2, "Chromium Run 2", "Chromium");
    const crun3: Domain_list[] = get_unique_domains(requests_chromium3, "Chromium Run 3", "Chromium");
    // make_piechart_data_browser_run(crun1, "chrome_run1");
    // make_piechart_data_browser_run(crun2, "chrome_run2");
    // make_piechart_data_browser_run(crun3, "chrome_run3");

    // Unique Domains for Firefox Runs
    const frun1: Domain_list[] = get_unique_domains(requests_f1, "Firefox Run 1", "Firefox");
    const frun2: Domain_list[] = get_unique_domains(requests_f2, "Firefox Run 2", "Firefox");
    const frun3: Domain_list[] = get_unique_domains(requests_f3, "Firefox Run 3", "Firefox");
    // make_piechart_data_browser_run(frun1, "ffox_run1");
    // make_piechart_data_browser_run(frun2, "ffox_run2");
    // make_piechart_data_browser_run(frun3, "ffox_run3");

    // Unique Domains for Webkit Runs
    const wrun1: Domain_list[] = get_unique_domains(requests_w1, "Webkit Run 1", "Webkit");
    const wrun2: Domain_list[] = get_unique_domains(requests_w2, "Webkit Run 2", "Webkit");
    const wrun3: Domain_list[] = get_unique_domains(requests_w3, "Webkit Run 3", "Webkit");
    // make_piechart_data_browser_run(wrun1, "webkit_run1");
    // make_piechart_data_browser_run(wrun2, "webkit_run2");
    // make_piechart_data_browser_run(wrun3, "webkit_run3");

    // Set of website runs for run 1 (all browsers)
    const google_runs1: Domain_list[] = [crun1[0], frun1[0], wrun1[0]];
    const wiki_runs1: Domain_list[] = [crun1[1], frun1[1], wrun1[1]];
    const mozilla_runs1: Domain_list[] = [crun1[2], frun1[2], wrun1[2]];
    const cnn_runs1: Domain_list[] = [crun1[3], frun1[3], wrun1[3]];

    // Make pie chart data for each website for run 2
    const pie_g1: PieChartData = make_piechart_data_website(google_runs1);
    const pie_w1: PieChartData = make_piechart_data_website(wiki_runs1);
    const pie_m1: PieChartData = make_piechart_data_website(mozilla_runs1);
    const pie_c1: PieChartData = make_piechart_data_website(cnn_runs1);

    // Set of website runs for run 2 (all browsers)
    const google_runs2: Domain_list[] = [crun2[0], frun2[0], wrun2[0]];
    const wiki_runs2: Domain_list[] = [crun2[1], frun2[1], wrun2[1]];
    const mozilla_runs2: Domain_list[] = [crun2[2], frun2[2], wrun2[2]];
    const cnn_runs2: Domain_list[] = [crun2[3], frun2[3], wrun2[3]];

    // Make pie chart data for each website for run 2
    const pie_g2: PieChartData = make_piechart_data_website(google_runs2);
    const pie_w2: PieChartData = make_piechart_data_website(wiki_runs2);
    const pie_m2: PieChartData = make_piechart_data_website(mozilla_runs2);
    const pie_c2: PieChartData = make_piechart_data_website(cnn_runs2);

    // Set of website runs for run 1 (all browsers)
    const google_runs3: Domain_list[] = [crun3[0], frun3[0], wrun2[0]];
    const wiki_runs3: Domain_list[] = [crun3[1], frun3[1], wrun3[1]];
    const mozilla_runs3: Domain_list[] = [crun3[2], frun3[2], wrun3[2]];
    const cnn_runs3: Domain_list[] = [crun3[3], frun3[3], wrun3[3]];

    // Make pie chart data for each website for run 3
    const pie_g3: PieChartData = make_piechart_data_website(google_runs3);
    const pie_w3: PieChartData = make_piechart_data_website(wiki_runs3);
    const pie_m3: PieChartData = make_piechart_data_website(mozilla_runs3);
    const pie_c3: PieChartData = make_piechart_data_website(cnn_runs3);

    // Make data files for the webpage to plot pie charts with for all websites
    piechart_website_file([pie_g1,pie_g2,pie_g3], "Google_all_runs");
    piechart_website_file([pie_w1,pie_w2,pie_w3], "Wiki_all_runs");
    piechart_website_file([pie_m1,pie_m2,pie_m3], "Mozilla_all_runs");
    piechart_website_file([pie_c1,pie_c2,pie_c3], "Cnn_all_runs");

    // console.log("**********");
    // get_third_party_requests(requests_chromium1, "Chromium Run 1");
    //  console.log("\n");
    // get_third_party_requests(requests_chromium2, "Chromium Run 2");
    //  console.log("\n");
    // get_third_party_requests(requests_chromium3, "Chromium Run 3");
}

list_data();