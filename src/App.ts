// Utility Functions
import { renderPlotlyGraph, make_piecharts_chrome, make_piecharts_firefox, make_piecharts_webkit, make_piechart_website } from './Scripts/DataGraphing';

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

    <div id="plotlyGraph"></div>

    <button id="first_site_button" type="button">First Site</button>
    <button id="second_site_button" type="button">Second Site</button>
    <button id="third_site_button" type="button">Third Site</button>
    <button id="fourth_site_button" type="button">Fourth Site</button>

    <div id="pie1"></div>
    <div id="pie2"></div>
    <div id="pie3"></div>

  </div>
</section>
`



// -- Event Listeners --

// Retrieves references to various form elements.
const firstButton: HTMLFormElement = document.querySelector<HTMLFormElement>('#first_site_button')!;
const secondButton: HTMLFormElement = document.querySelector<HTMLFormElement>('#second_site_button')!;
const thirdButton: HTMLFormElement = document.querySelector<HTMLFormElement>('#third_site_button')!;
const fourthButton: HTMLFormElement = document.querySelector<HTMLFormElement>('#fourth_site_button')!;

// Adds an event listener to the first button.
firstButton.addEventListener('click', () => displaySiteCookieData("www.google.com"));

// Adds an event listener to the second button.
secondButton.addEventListener('click', () => displaySiteCookieData("www.wikipedia.com"));

// Adds an event listener to the third button.
thirdButton.addEventListener('click', () => displaySiteCookieData("www.mozilla.org"));

// Adds an event listener to the fourth button.
fourthButton.addEventListener('click', () => displaySiteCookieData("edition.cnn.com/2026/11/12/sport/what-to-know-for-nfl-week-10"));



// -- Helper Functions --

/**
   * Displays the cookie data for a given site URL.
   * @param _siteURL - The site URL to visit.
   */
const displaySiteCookieData = async (_siteURL: string): Promise<void> => {
    renderPlotlyGraph("plotlyGraph");
    if(_siteURL == "www.google.com"){
      // make_piecharts_chrome(["pie1","pie2","pie3"]);
      make_piechart_website(["pie1","pie2","pie3"], "Google");
    }
    if(_siteURL == "www.wikipedia.com"){
      // make_piecharts_firefox(["pie1","pie2","pie3"]);
      make_piechart_website(["pie1","pie2","pie3"], "Wikipedia");
    }
    if(_siteURL == "www.mozilla.org"){
      // make_piecharts_webkit(["pie1","pie2","pie3"]);
      make_piechart_website(["pie1","pie2","pie3"], "Mozilla");
    }
    if(_siteURL == "edition.cnn.com/2026/11/12/sport/what-to-know-for-nfl-week-10"){
      // make_piecharts_webkit(["pie1","pie2","pie3"]);
      make_piechart_website(["pie1","pie2","pie3"], "CNN");
    }
}