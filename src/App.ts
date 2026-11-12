// Utility Functions
import fetchCookies from './Scripts/CookiePuller';

// Assets
import AuburnLogo from './Assets/AuburnLogo.svg';

// Styling
import './App.css';


// This script is the main HTML for the project.



// -- Rendering --

// Renders the main content of the app.
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${AuburnLogo}" class="base" width="170" height="179" alt="Auburn Logo">
  </div>

  <div>

    <h1>Auburn COMP5370</h1>
    <h2>Cookie Comparison Script</h2>
    <p>This project compares fetched third-party cookies and tracking cookies from different sources.</p>
    <p>Add instructions here.</p>

    <br>

    <p>Add stuff here.</p>

    <br>

    <button id="first_site_button" type="button">First Site</button>
    <button id="second_site_button" type="button">Second Site</button>
    <button id="third_site_button" type="button">Third Site</button>

  </div>
</section>
`


// -- Event Listeners --

// Retrieves references to various form elements.
const firstButton: HTMLFormElement = document.querySelector<HTMLFormElement>('#first_site_button')!;
const secondButton: HTMLFormElement = document.querySelector<HTMLFormElement>('#second_site_button')!;
const thirdButton: HTMLFormElement = document.querySelector<HTMLFormElement>('#third_site_button')!;

// Adds an event listener to the first button.
firstButton.addEventListener('click', () => clickSiteButton("www.google.com"));

// Adds an event listener to the second button.
secondButton.addEventListener('click', () => clickSiteButton("www.facebook.com"));

// Adds an event listener to the third button.
thirdButton.addEventListener('click', () => clickSiteButton("www.twitter.com"));


// -- Helper Functions --

/**
   * Executes functionality when a site button is clicked, such as kicking off cookie collection and displaying results.
   * @param _siteURL - The site URL to visit.
   */
const clickSiteButton = (_siteURL: string): void => {
    // Fetches the cookies from the specified site URL.
    const cookiesForSite: string = fetchCookies(_siteURL);
}