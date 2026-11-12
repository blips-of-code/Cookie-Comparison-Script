// This file contains all of the different types that are useful for our AES project.

/**
 * Represents a cookie retrieved from a website.
 */
export interface Cookie {
    name: string;
    value: string;
    domain: string;
    isThirdParty: boolean;
}