
/**
 * This is primarily adapted from Rgiles's cookie code and the article below
 * https://www.dumky.net/posts/check-cookie-consent-with-playwrights-browser-automation-in-python/ 
 */


// Utilities
import { chromium } from "playwright";

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


async function Fetch_NetTraffic(_siteURL: string):Promise<ResultURL[]> {
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
                thirdparty: isCookieThirdParty(req.url(),_siteURL)
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

function isCookieThirdParty(
    _cookieDomain: string,
    _siteURL: string
): boolean {

    const siteHostname = new URL(_siteURL).hostname;
    const cookieDomain = getDomain(new URL(_cookieDomain).hostname);

    const siteDomain = getDomain(siteHostname);
    // const cookieDomain = getDomain(
    //     _cookieDomain.replace(/^\./, "")
    // );

    // Fall back to hostname comparison when needed.
    return (siteDomain ?? siteHostname) !==
        (cookieDomain ?? _cookieDomain);
}

async function NetTraffic(): Promise<void> {
    const output_array: NetResult[] = [];

    for (const website of WEBSITES){
        console.log(`Collecting request urls: ${website}`);

        try{
            const urls: ResultURL[] = (await Fetch_NetTraffic(website));

            const this_result: NetResult = {
                website,
                collectedAt: new Date().toISOString(),
                urls
            }

            output_array.push(this_result);

            console.log(`Collected ${urls.length} urls.`);

        }
        catch(error){
            console.error(`Failed: ${website}`, error);

            const err_result: NetResult = {
                website,
                collectedAt: new Date().toISOString(),
                urls: [],
                error: error instanceof Error ? error.message : "Unknown error"
            }

            output_array.push(err_result);
        }
    }

     // Creates the output directory if necessary.
    await mkdir("public/data", { recursive: true });
    // Writes results to JSON.
    await writeFile("public/data/request_urls.json", JSON.stringify(output_array, null, 2), "utf-8");

    // Logs a message indicating that cookie collection has completed.
    console.log("Request URL collection completed.");
    
}

// Initiates the cookie collection process and handles any errors that may occur.
NetTraffic().catch(error => {
    console.error(error);
    process.exitCode = 1;
});