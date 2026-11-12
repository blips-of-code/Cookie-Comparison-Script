// Utilities
import { chromium, firefox } from "playwright";

// Types
import type { Cookie, Browser, BrowserContext } from "playwright";
import type { CookieInfo } from "./Types";


// -- Functions --

/**
   * Attempts to fetch the cookies from the specified site URL.
   * @param _siteURL - The site URL to fetch cookies from.
   * @returns A Promise containing an array of CookieInfo objects.   
*/
export default async function fetchCookies(_siteURL: string): Promise<CookieInfo[]> {
    // Launches a new Firefox browser.
    const browser: Browser = await chromium.launch({
        headless: true
    });

    // Fetches the cookies from the specified site URL.
    try {
        // Attempts to load the site in the browser and retrieve the browser context.
        const browserContext: BrowserContext = await loadSiteOnBrowser(browser, _siteURL);

        // Attempts to retrieve all cookies stored in the browser context.
        const cookies: Cookie[] = await retrieveCookiesOnBrowser(browserContext);

        const cookieInfos: CookieInfo[] = convertCookiesToCookieInfos(cookies);

        // Returns the retrieved cookies as CookieInfos.
        return cookieInfos;
    }
    finally {
        // Closes the browser, even if an error occurs.
        await browser.close();
    }
}


// -- Helper Functions --

/**
   * Attempts to load a site in the browser using the specified URL.
   * @param _browser - The browser instance to use for loading the site.
   * @param _siteURL - The site URL to load.
   * @returns The BrowserContext used to load the site.
*/
async function loadSiteOnBrowser(_browser: Browser, _siteURL: string): Promise<BrowserContext> {
    // Creates an isolated browser context.
    const browserContext: BrowserContext = await _browser.newContext();

    // Opens a new browser page.
    const page = await browserContext.newPage();

    // Navigates to the specified website.
    await page.goto(_siteURL, {
        waitUntil: "domcontentloaded",
        timeout: 30000
    });

    // Allows additional resources and scripts to load.
    await page.waitForTimeout(3000);

    // Returns the browser context for further operations, such as retrieving cookies.
    return browserContext;
}

/**
* Attempts to retrieve all cookies from the provided BrowserContext.
* @param _browserContext - The BrowserContext to retrieve cookies from.
* @returns The Cookies stored in the BrowserContext.
*/
async function retrieveCookiesOnBrowser(_browserContext: BrowserContext): Promise<Cookie[]> {
    // Retrieves all cookies stored in the browser context.
    const cookies: Cookie[] = await _browserContext.cookies();

    // Returns the retrieved cookies.
    return cookies;
}

/**
* Converts an array of Cookie objects to an array of CookieInfo objects, including third-party status.
* @param _cookies - The array of Cookie objects to convert.
* @returns An array of CookieInfo objects.
*/
function convertCookiesToCookieInfos(_cookies: Cookie[]): CookieInfo[] {
    // Maps the retrieved cookies to the CookieInfo format.
    const cookieInfo: CookieInfo[] = _cookies.map(cookie => ({
        name: cookie.name,
        domain: cookie.domain,
        path: cookie.path,
        expires: cookie.expires,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        isThirdParty: false // This will be updated by other scripts.
    }));

    // Returns the converted CookieInfo array.
    return cookieInfo;
}