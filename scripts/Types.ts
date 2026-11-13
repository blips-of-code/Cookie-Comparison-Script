/** 
* Represents the information of a single cookie.
*/
export interface CookieInfo {
    name: string;
    domain: string;
    path: string;
    expires: number;
    httpOnly: boolean;
    secure: boolean;
    sameSite: string;
    isThirdParty: boolean;
}

/** 
 * Represents the result of collecting cookies from a website.
 */
export interface WebsiteResult {
    website: string;
    collectedAt: string;
    cookies: CookieInfo[];
    error?: string;
}

export interface ResultURL {
    url: string;
    thirdparty: boolean;
}

export interface NetResult {
    website: string;
    collectedAt: string;
    urls: ResultURL[];
    error?: string;
}