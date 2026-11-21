/** 
* Represents the information of a single cookie.
*/
export interface CookieInfo {
    name: string;
    domain: string;
    path: string;
    expires: number;
    date_collected: string;
    date_expires: string;
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
    date_collected: string;
    thirdparty: boolean;
}

export interface NetResult {
    website: string;
    collectedAt: string;
    urls: ResultURL[];
    count: number;
    error?: string;
}

export interface Domain_entry{
    domain_name: string;
    count: number;
}

export interface Domain_list{
    website: string;
    domains: Domain_entry[];
}

export interface PieChartData {
    data: Data[];
    layout: Partial<Layout>[];
}