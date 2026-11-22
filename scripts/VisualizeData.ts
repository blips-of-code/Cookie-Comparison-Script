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

function get_unique_domains(_filecontent: NetResult[], _filename:string, _browser:string): Domain_list[]{
    const all_unique_domains: Domain_list[] = [];
    console.log(`Site requests for ${_filename}`);
    _filecontent.forEach(element => {
        const domain_list: Domain_entry[] = [];
        const site_urls: NetResult = element;
        site_urls.urls.forEach(url => {
            const this_domain = getDomain(new URL(url.url).hostname) ?? "";
            if(!is_in_domain_list(domain_list, this_domain)){
                const entry:Domain_entry = {
                    domain_name: this_domain,
                    count: 1
                }
                domain_list.push(entry);
            }
            else{
                domain_list.forEach(domain => {
                    if(domain.domain_name == this_domain){
                        domain.count++;
                    }
                })
            }
        });
        const this_list: Domain_list = {
            website: element.website,
            browser: _browser,
            domains: domain_list
        }
        all_unique_domains.push(this_list);
    });
    return all_unique_domains;
}

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

function make_piechart_data_website(_domain_list:Domain_list[], _viewname: string): PieChartData {
    
    const all_data: Data[] = [];
    const all_layout: Partial<Layout>[] = [];
    const output: PieChartData = {
        data: all_data,
        layout: all_layout
    }
    var colcount: number = 0;
    
    // For each browser
    _domain_list.forEach(element => {
        var layout:Partial<Layout> = {
            title: { text: element.website},
            height: 400,
            width: 800,
            margin: {"t": 30, "b": 0, "l": 60, "r": 0},
            showlegend: false,
            grid: {rows: 1, columns: 4, xgap: 0.4, subplots: ['xy','x2y','x3y','x4y'], pattern: 'independent'}
        }
        // Google
        const domains_array: string[] = [];
        const counts_array: number[] = [];

        element.domains.forEach(domain_entry => {
            domains_array.push(domain_entry.domain_name);
            counts_array.push(domain_entry.count);
        });
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
        // console.log(domains_array);
        all_data.push(data);
        all_layout.push(layout);
        colcount++;

        // // Creates the output directory if necessary.
        // mkdir("public/data_views/websites", { recursive: true });
        // // Writes results to JSON.
        // writeFile(`public/data_views/websites/${_viewname}.json`, JSON.stringify(output, null, 2), "utf-8");
    })
    return output;
}

function piechart_website_file(_charts:PieChartData[], _viewname: string): void {
    // Creates the output directory if necessary.
    mkdir("public/data_views/websites", { recursive: true });
    // Writes results to JSON.
    writeFile(`public/data_views/websites/${_viewname}.json`, JSON.stringify(_charts, null, 2), "utf-8");
}

function is_in_domain_list(_domainlist: Domain_entry[], _url:string): boolean{
    let is_in_list: boolean = false;

    _domainlist.forEach(domain => {
        if(!is_in_list && domain.domain_name == _url){
            is_in_list = true;
        }
    });
    return is_in_list;
}


function make_piechart_data(_domain_list:Domain_list[], _viewname: string):void{
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

function list_data(): void{
    const crun1: Domain_list[] = get_unique_domains(requests_chromium1, "Chromium Run 1", "Chromium");
    make_piechart_data(crun1, "chrome_run1");
    const crun2: Domain_list[] = get_unique_domains(requests_chromium2, "Chromium Run 2", "Chromium");
    make_piechart_data(crun2, "chrome_run2");
    const crun3: Domain_list[] = get_unique_domains(requests_chromium3, "Chromium Run 3", "Chromium");
    make_piechart_data(crun3, "chrome_run3");

    const frun1: Domain_list[] = get_unique_domains(requests_f1, "Firefox Run 1", "Firefox");
    make_piechart_data(frun1, "ffox_run1");
    const frun2: Domain_list[] = get_unique_domains(requests_f2, "Firefox Run 2", "Firefox");
    make_piechart_data(frun2, "ffox_run2");
    const frun3: Domain_list[] = get_unique_domains(requests_f3, "Firefox Run 3", "Firefox");
    make_piechart_data(frun3, "ffox_run3");

    const wrun1: Domain_list[] = get_unique_domains(requests_w1, "Webkit Run 1", "Webkit");
    make_piechart_data(wrun1, "webkit_run1");
    const wrun2: Domain_list[] = get_unique_domains(requests_w2, "Webkit Run 2", "Webkit");
    make_piechart_data(wrun2, "webkit_run2");
    const wrun3: Domain_list[] = get_unique_domains(requests_w3, "Webkit Run 3", "Webkit");
    make_piechart_data(wrun3, "webkit_run3");

    const google_runs1: Domain_list[] = [crun1[0], frun1[0], wrun1[0]];
    const wiki_runs1: Domain_list[] = [crun1[1], frun1[1], wrun1[1]];
    const mozilla_runs1: Domain_list[] = [crun1[2], frun1[2], wrun1[2]];
    const cnn_runs1: Domain_list[] = [crun1[3], frun1[3], wrun1[3]];

    const pie_g1: PieChartData = make_piechart_data_website(google_runs1, "Google_requests1");
    const pie_w1: PieChartData = make_piechart_data_website(wiki_runs1, "Wiki_requests1");
    const pie_m1: PieChartData = make_piechart_data_website(mozilla_runs1, "Mozilla_requests1");
    const pie_c1: PieChartData = make_piechart_data_website(cnn_runs1, "Cnn_requests1");

    const google_runs2: Domain_list[] = [crun2[0], frun2[0], wrun2[0]];
    const wiki_runs2: Domain_list[] = [crun2[1], frun2[1], wrun2[1]];
    const mozilla_runs2: Domain_list[] = [crun2[2], frun2[2], wrun2[2]];
    const cnn_runs2: Domain_list[] = [crun2[3], frun2[3], wrun2[3]];

    const pie_g2: PieChartData = make_piechart_data_website(google_runs2, "Google_requests2");
    const pie_w2: PieChartData = make_piechart_data_website(wiki_runs2, "Wiki_requests2");
    const pie_m2: PieChartData = make_piechart_data_website(mozilla_runs2, "Mozilla_requests2");
    const pie_c2: PieChartData = make_piechart_data_website(cnn_runs2, "Cnn_requests2");

    const google_runs3: Domain_list[] = [crun3[0], frun3[0], wrun2[0]];
    const wiki_runs3: Domain_list[] = [crun3[1], frun3[1], wrun3[1]];
    const mozilla_runs3: Domain_list[] = [crun3[2], frun3[2], wrun3[2]];
    const cnn_runs3: Domain_list[] = [crun3[3], frun3[3], wrun3[3]];

    const pie_g3: PieChartData = make_piechart_data_website(google_runs3, "Google_requests3");
    const pie_w3: PieChartData = make_piechart_data_website(wiki_runs3, "Wiki_requests3");
    const pie_m3: PieChartData = make_piechart_data_website(mozilla_runs3, "Mozilla_requests3");
    const pie_c3: PieChartData = make_piechart_data_website(cnn_runs3, "Cnn_requests3");

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