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
import type { NetResult, ResultURL } from "./Types";
import type { Data, Layout, Config } from 'plotly.js-dist-min';


// Types
import { Domain_entry, Domain_list } from "./Types";

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


function make_piechart_data(_domain_list:Domain_list[], _viewname: string):void{

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
        // var data = {
        //     type: 'pie',
        //     values: counts_array,
        //     labels: domains_array,
        // }
        const data: Data[] = [{
            type: 'pie',
            values: counts_array,
            labels: domains_array
        }]
        var run = {
            layout: layout,
            data: data
        }
    // Creates the output directory if necessary.
    mkdir("public/data_views", { recursive: true });
    // Writes results to JSON.
    writeFile(`public/data_views/${_viewname}.json`, JSON.stringify(run, null, 2), "utf-8");

    });
}

function list_data(): void{
    const crun1: Domain_list[] = get_unique_domains(requests_chromium1, "Chromium Run 1");
    make_piechart_data(crun1, "chrome_run1");
    const crun2: Domain_list[] = get_unique_domains(requests_chromium2, "Chromium Run 2");
    make_piechart_data(crun2, "chrome_run2");
    const crun3: Domain_list[] = get_unique_domains(requests_chromium3, "Chromium Run 3");
    make_piechart_data(crun3, "chrome_run3");

    const frun1: Domain_list[] = get_unique_domains(requests_f1, "Firefox Run 1");
    make_piechart_data(frun1, "ffox_run1");
    const frun2: Domain_list[] = get_unique_domains(requests_f2, "Firefox Run 2");
    make_piechart_data(frun2, "ffox_run2");
    const frun3: Domain_list[] = get_unique_domains(requests_f3, "Firefox Run 3");
    make_piechart_data(frun3, "ffox_run3");

    const wrun1: Domain_list[] = get_unique_domains(requests_w1, "Webkit Run 1");
    make_piechart_data(wrun1, "webkit_run1");
    const wrun2: Domain_list[] = get_unique_domains(requests_w2, "Webkit Run 2");
    make_piechart_data(wrun2, "webkit_run2");
    const wrun3: Domain_list[] = get_unique_domains(requests_w3, "Webkit Run 3");
    make_piechart_data(wrun3, "webkit_run3");
    // console.log("**********");
    // get_third_party_requests(requests_chromium1, "Chromium Run 1");
    //  console.log("\n");
    // get_third_party_requests(requests_chromium2, "Chromium Run 2");
    //  console.log("\n");
    // get_third_party_requests(requests_chromium3, "Chromium Run 3");
}

list_data();