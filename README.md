# Computer Network Security Project 2 Proposal 

Group 17: Claire Justis, Sharmin Zaman, Rayce Giles, Kumi Weilbacher 

Purpose:  

Cookies are used across the web for a variety of purposes. A common purpose with massive privacy implications is use by companies for tracking where users go and what they do across the web. This data is used to build highly sophisticated profiles of individuals that are used by companies for targeted advertising, or often, sold to other companies for that purpose. While users might be aware cookies exist and are being stored, they may not understand the sheer volume of cookies coming and going through exchanges being made by the browser for any given website. 

For this project, we intend to create a Typescript program that will send and capture responses from get requests to several news platforms (consider other types of site as well for broader comparison?), formatting and displaying the data received. What kinds of services are requesting to store cookies? How many? What other information can the requests show us that is often obscured to end users who are not reading request traffic every time they browse the web? 

Possible other thing to add (if time allows?): How do requests and the cookies that accompany them change across browsers with different security measures such as adblockers, browser settings disabling cookies, or even just different browsers like Chrome vs Firefox vs Safari? 

 

Deliverables: 

Webpage containing tabs for each site with an "export as XML" button available on each tab. 

Typescript program for sending requests, parsing responses, and displaying a webpage with formatted results 

Option for exporting an XML of the response data 

Report of findings summarizing and drawing comparisons about the script results 

Language Used: Typescript, Plotly.js library for graphing 

 

List of Sites we are considering: 

News: CNN, FoxNews, The New York Times, Medium 

University: Auburn homepage, Alabama homepage 

Misc: W3Schools, Wikipedia, WikiHow 

 

Division of work: 

Rayce: NPM setup for the web interface, Get request setup 

Sharmin: Testing and HTML 

Kumi: Export data as XML feature 

Claire: Plotly setup for displaying results 

 

Charts we are considering: 

Necessary vs Optional Cookies for each site (pie chart) 

Necessary vs Optional Cookies compared between all sites (double bar graph) 

More to be considered once we have some sample requests and know what data we will have available 

 
