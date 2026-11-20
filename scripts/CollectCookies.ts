// Utility Functions
import { mkdir, writeFile } from "node:fs/promises";
import fetchCookies from "./fetchCookies";
import { getDomain } from "tldts";

// Types
import type { CookieInfo, WebsiteResult } from "./Types";


// -- Constants --

/** 
 * A list of websites to collect cookies from.
 */
const WEBSITES: string[] = [
    "https://www.google.com",
    "https://www.wikipedia.org",
    "https://www.mozilla.org",
    "https://edition.cnn.com/2026/11/12/sport/what-to-know-for-nfl-week-10"
];


// -- Functions --

/**
 * Collects cookies from every configured website.
 */
async function collectCookies(): Promise<void> {
    // Tracks the results of cookie collection for each website.
    const websiteResults: WebsiteResult[] = [];

    // For each website, attempt to collect cookies and store the results.
    for (const website of WEBSITES) {
        // Logs the current website being processed.
        console.log(`Collecting cookies: ${website}`);

        try {
            // Attempts to fetch cookies from the current website.
            const cookies: CookieInfo[] = await fetchCookies(website);

            // Creates a new WebsiteResult object with the collected cookies.
            const websiteResult: WebsiteResult = {
                website,
                collectedAt: new Date().toISOString(),
                cookies
            };

            // Adds the website result to the list of results.
            websiteResults.push(websiteResult);

            // Logs the number of cookies collected for the current website.
            console.log(`Collected ${cookies.length} cookies.`);
        }
        catch (error) {
            // Logs any errors that occur during cookie collection for the current website.
            console.error(`Failed: ${website}`, error);

            // Creates a new WebsiteResult object with an error message and no cookies.
            const websiteResult: WebsiteResult = {
                website,
                collectedAt: new Date().toISOString(),
                cookies: [],
                error: error instanceof Error ? error.message : "Unknown error"
            };

            // Adds the website result with the error to the list of results.
            websiteResults.push(websiteResult);
        }
    }

    // Creates the output directory if necessary.
    await mkdir("public/data", { recursive: true });

    // Writes results to JSON.
    await writeFile("public/data/cookies.json", JSON.stringify(websiteResults, null, 2), "utf-8");

    // Logs a message indicating that cookie collection has completed.
    console.log("Cookie collection completed.");
}

/**
* Determines whether a cookie is considered third-party based on its domain and the site URL.
* @param _cookieDomain - The domain of the cookie.
* @param _siteURL - The URL of the site being visited.
* @returns
*/
function isCookieThirdParty(
    _cookieDomain: string,
    _siteURL: string
): boolean {

    const siteHostname = new URL(_siteURL).hostname;

    const siteDomain = getDomain(siteHostname);
    const cookieDomain = getDomain(
        _cookieDomain.replace(/^\./, "")
    );

    // Fall back to hostname comparison when needed.
    return (siteDomain ?? siteHostname) !==
        (cookieDomain ?? _cookieDomain);
}



// -- Execution --

// Initiates the cookie collection process and handles any errors that may occur.
collectCookies().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
