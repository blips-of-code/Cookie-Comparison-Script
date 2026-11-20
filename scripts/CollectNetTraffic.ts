
/**
 * This is primarily adapted from Rgiles's cookie code and the article below
 * https://www.dumky.net/posts/check-cookie-consent-with-playwrights-browser-automation-in-python/ 
 */


// Utilities
import { chromium, firefox, webkit } from "playwright";

// Types
import type { Browser, BrowserContext } from "playwright";

// Utility Functions
import { mkdir, writeFile } from "node:fs/promises";
import { getDomain } from "tldts";

// Types
import type { NetResult, ResultURL } from "./Types";

/** 
 * A list of websites to collect cookies from.
 */
const WEBSITES: string[] = [
    "https://www.google.com",
    "https://www.wikipedia.org",
    "https://www.mozilla.org",
    "https://edition.cnn.com/2026/11/12/sport/what-to-know-for-nfl-week-10"
];

async function Fetch_NetTrafficChromium(_siteURL: string):Promise<ResultURL[]> {
    const browser: Browser = await chromium.launch({
            headless: true
        });

    try{
        const browserContext: BrowserContext = await browser.newContext();
        const page = await browserContext.newPage();

        const req_urls: ResultURL[] = [];
        page.on('request', (req)=>{

            const this_url: ResultURL = {
                url: req.url(),
                date_collected: new Date(Date.now()).toUTCString(),
                thirdparty: isRequestThirdParty(req.url(),_siteURL)
            }
            req_urls.push(this_url)
        });

        await page.goto(_siteURL, {
        waitUntil: "networkidle",
        timeout: 30000
        });

        return req_urls;
    }
    finally {
        // Closes the browser, even if an error occurs.
        await browser.close();
    }
    
}
async function Fetch_NetTrafficFirefox(_siteURL: string):Promise<ResultURL[]> {
    const browser: Browser = await firefox.launch({
            headless: true
        });

    try{
        const browserContext: BrowserContext = await browser.newContext();
        const page = await browserContext.newPage();

        const req_urls: ResultURL[] = [];
        page.on('request', (req)=>{

            const this_url: ResultURL = {
                url: req.url(),
                date_collected: new Date(Date.now()).toUTCString(),
                thirdparty: isRequestThirdParty(req.url(),_siteURL)
            }
            req_urls.push(this_url)
        });

        await page.goto(_siteURL, {
        waitUntil: "networkidle",
        timeout: 30000
        });

        return req_urls;
    }
    finally {
        // Closes the browser, even if an error occurs.
        await browser.close();
    }
    
}
async function Fetch_NetTrafficWebkit(_siteURL: string):Promise<ResultURL[]> {
    const browser: Browser = await firefox.launch({
            headless: true
        });

    try{
        const browserContext: BrowserContext = await browser.newContext();
        const page = await browserContext.newPage();

        const req_urls: ResultURL[] = [];
        page.on('request', (req)=>{

            const this_url: ResultURL = {
                url: req.url(),
                date_collected: new Date(Date.now()).toUTCString(),
                thirdparty: isRequestThirdParty(req.url(),_siteURL)
            }
            req_urls.push(this_url)
        });

        await page.goto(_siteURL, {
        waitUntil: "networkidle",
        timeout: 30000
        });

        return req_urls;
    }
    finally {
        // Closes the browser, even if an error occurs.
        await browser.close();
    }
    
}


function isRequestThirdParty(
    _reqDomain: string,
    _siteURL: string
): boolean {

    const siteHostname = new URL(_siteURL).hostname;
    const cookieDomain = getDomain(new URL(_reqDomain).hostname);
    const siteDomain = getDomain(siteHostname);

    // Fall back to hostname comparison when needed.
    return (siteDomain ?? siteHostname) !==
        (cookieDomain ?? _reqDomain);
}

async function NetTraffic(): Promise<void> {
    const output_array_c: NetResult[] = [];
    const output_array_f: NetResult[] = [];
    const output_array_w: NetResult[] = [];
    
    for (const website of WEBSITES){
        console.log(`Collecting request urls: ${website}`);
    
        // TRY THE WEBSITES WITH CHROMIUM
        try{
            const urls_chrome: ResultURL[] = (await Fetch_NetTrafficChromium(website));
            const chrome_result: NetResult = {
                website,
                collectedAt: new Date().toISOString(),
                count: urls_chrome.length,
                urls: urls_chrome
            }
            output_array_c.push(chrome_result);
            console.log(`Collected ${urls_chrome.length} urls from Chromium.`);

        }
        catch(error){
            console.error(`Failed: ${website}`, error);

            const err_result: NetResult = {
                website,
                collectedAt: new Date().toISOString(),
                urls: [],
                count: 0,
                error: error instanceof Error ? error.message : "Unknown error"
            }
            output_array_c.push(err_result);
        }
        // TRY THE WEBSITES WITH FIREFOX
        try{
            const urls_firefox: ResultURL[] = (await Fetch_NetTrafficFirefox(website));
            const ff_result: NetResult = {
                website,
                collectedAt: new Date().toISOString(),
                count: urls_firefox.length,
                urls: urls_firefox
            }
            output_array_f.push(ff_result);
            console.log(`Collected ${urls_firefox.length} urls from Firefox.`);
        }
        catch(error){
            console.error(`Failed: ${website}`, error);

            const err_result: NetResult = {
                website,
                collectedAt: new Date().toISOString(),
                urls: [],
                count: 0,
                error: error instanceof Error ? error.message : "Unknown error"
            }
            output_array_f.push(err_result);
        }
        // TRY THE WEBSITES WITH WEBKIT
        try{
            const urls_webkit: ResultURL[] = (await Fetch_NetTrafficWebkit(website));
            const wk_result: NetResult = {
                website,
                collectedAt: new Date().toISOString(),
                count: urls_webkit.length,
                urls: urls_webkit
            }
            output_array_w.push(wk_result);
            console.log(`Collected ${urls_webkit.length} urls from Webkit.`);
        }
        catch(error){
            console.error(`Failed: ${website}`, error);

            const err_result: NetResult = {
                website,
                collectedAt: new Date().toISOString(),
                urls: [],
                count: 0,
                error: error instanceof Error ? error.message : "Unknown error"
            }
            output_array_w.push(err_result);
        }
    }

     // Creates the output directory if necessary.
    await mkdir("public/data/", { recursive: true });
    // Writes results to JSON.
    await writeFile("public/data/request_urls_chromium.json", JSON.stringify(output_array_c, null, 2), "utf-8");
    await writeFile("public/data/request_urls_firefox.json", JSON.stringify(output_array_f, null, 2), "utf-8");
    await writeFile("public/data/request_urls_webkit.json", JSON.stringify(output_array_w, null, 2), "utf-8");

    // Logs a message indicating that cookie collection has completed.
    console.log("Request URL collection completed.");
    
}

// Initiates the cookie collection process and handles any errors that may occur.
NetTraffic().catch(error => {
    console.error(error);
    process.exitCode = 1;
});