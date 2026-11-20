
import requests_chromium1 from "../public/data/Requests_run1/request_urls_chromium.json";
import requests_chromium2 from "../public/data/Requests_run2/request_urls_chromium.json";
import requests_chromium3 from "../public/data/Requests_run3/request_urls_chromium.json";
// Types
import type { NetResult, ResultURL } from "./Types";
// Utility
import { getDomain } from "tldts";

//NEED TO GET PLOTLY IMPORTED


interface Domain_entry{
    domain_name: string;
    count: number;
}
interface Domain_list{
    website: string;
    domains: Domain_entry[];
}

function get_unique_domains(_filecontent: NetResult[], _filename:string): Domain_list[]{
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

function is_in_domain_list(_domainlist: Domain_entry[], _url:string): boolean{
    let is_in_list: boolean = false;

    _domainlist.forEach(domain => {
        if(!is_in_list && domain.domain_name == _url){
            is_in_list = true;
        }
    });
    return is_in_list;
}

// THIS WILL BE FIXED ONCE PLOTLY IS PROPERLY IMPORTED
function make_piechart(_domain_list:Domain_list[]):void {

    _domain_list.forEach(element => {
        const domains_array: string[] = [];
        const counts_array: number[] = [];
        var layout = {
            title: element.website,
            height: 400,
            width: 400,
            margin: {"t": 0, "b": 0, "l": 0, "r": 0},
            showlegend: false
        }
        element.domains.forEach(domain_entry => {
            domains_array.push(domain_entry.domain_name);
            counts_array.push(domain_entry.count);
        })
        var data = {
            values: counts_array,
            labels: domains_array,
            type: 'pie',
        }

        // Plotly.newPlot('myDiv',data,layout);

    });
}

function list_data(): void{
    const run1: Domain_list[] = get_unique_domains(requests_chromium1, "Chromium Run 1");
    make_piechart(run1);
    // const run2: Domain_list[] = get_unique_domains(requests_chromium2, "Chromium Run 2");
    // const run3: Domain_list[] = get_unique_domains(requests_chromium3, "Chromium Run 3");
    // console.log("**********");
    // get_third_party_requests(requests_chromium1, "Chromium Run 1");
    //  console.log("\n");
    // get_third_party_requests(requests_chromium2, "Chromium Run 2");
    //  console.log("\n");
    // get_third_party_requests(requests_chromium3, "Chromium Run 3");
}

list_data();