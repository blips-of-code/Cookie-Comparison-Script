// Utility Functions
import Plotly from 'plotly.js-dist-min';

// Types
import type { Data, Layout, Config } from 'plotly.js-dist-min';

// Data
import chrome_run1 from "../../public/data_views/chrome_run1.json";
import chrome_run2 from "../../public/data_views/chrome_run2.json";
import chrome_run3 from "../../public/data_views/chrome_run3.json";
import ffox_run1 from "../../public/data_views/ffox_run1.json";
import ffox_run2 from "../../public/data_views/ffox_run2.json";
import ffox_run3 from "../../public/data_views/ffox_run3.json";
import webkit_run1 from "../../public/data_views/webkit_run1.json";
import webkit_run2 from "../../public/data_views/webkit_run2.json";
import webkit_run3 from "../../public/data_views/webkit_run3.json";

// -- Graph Functions --

export function make_piecharts_chrome(_htmlTags: string[]): void {
    // console.log(chrome_run1.data, chrome_run1.layout);

    const graphConfig: Partial<Config> = {
        responsive: true,
        scrollZoom: true,
        displayModeBar: true
    };

    const graphData1: Data[] = chrome_run1.data;
    const graphLayout1: Partial<Layout> = chrome_run1.layout;

    Plotly.newPlot(_htmlTags[0], graphData1, graphLayout1, graphConfig);

    const graphData2: Data[] = chrome_run2.data;
    const graphLayout2: Partial<Layout> = chrome_run2.layout;
    Plotly.newPlot(_htmlTags[1], graphData2, graphLayout2, graphConfig);

    const graphData3: Data[] = chrome_run3.data;
    const graphLayout3: Partial<Layout> = chrome_run3.layout;

    Plotly.newPlot(_htmlTags[2], graphData3, graphLayout3, graphConfig);
}

export function make_piecharts_firefox(_htmlTags: string[]): void {
    console.log(chrome_run1.data, chrome_run1.layout);

    const graphConfig: Partial<Config> = {
        responsive: true,
        scrollZoom: true,
        displayModeBar: true
    };

    const graphData1: Data[] = ffox_run1.data;
    const graphLayout1: Partial<Layout> = ffox_run1.layout;

    Plotly.newPlot(_htmlTags[0], graphData1, graphLayout1, graphConfig);

    const graphData2: Data[] = ffox_run2.data;
    const graphLayout2: Partial<Layout> = ffox_run2.layout;
    Plotly.newPlot(_htmlTags[1], graphData2, graphLayout2, graphConfig);

    const graphData3: Data[] = ffox_run3.data;
    const graphLayout3: Partial<Layout> = ffox_run3.layout;

     Plotly.newPlot(_htmlTags[2], graphData3, graphLayout3, graphConfig);
}

export function make_piecharts_webkit(_htmlTags: string[]): void {
    console.log(chrome_run1.data, chrome_run1.layout);

    const graphConfig: Partial<Config> = {
        responsive: true,
        scrollZoom: true,
        displayModeBar: true
    };

    const graphData1: Data[] = webkit_run1.data;
    const graphLayout1: Partial<Layout> = webkit_run1.layout;

    Plotly.newPlot(_htmlTags[0], graphData1, graphLayout1, graphConfig);

    const graphData2: Data[] = webkit_run2.data;
    const graphLayout2: Partial<Layout> = webkit_run2.layout;
    Plotly.newPlot(_htmlTags[1], graphData2, graphLayout2, graphConfig);

    const graphData3: Data[] = webkit_run3.data;
    const graphLayout3: Partial<Layout> = webkit_run3.layout;

    Plotly.newPlot(_htmlTags[2], graphData3, graphLayout3, graphConfig);
}

/**
* Renders the Plotly graph.
* Currently just a placeholder for testing purposes.
* @param _htmlTag - The HTML tag where the graph will be rendered.
*/
export function renderPlotlyGraph(_htmlTag: string): void {
    // Defines the data that will be displayed on the Plotly graph.
    const graphData: Data[] = [
        {
            x: [1, 2, 3, 4, 5],
            y: [10, 15, 13, 17, 22],
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Example Data'
        }
    ];

    // Defines the appearance of the Plotly graph.
    const graphLayout: Partial<Layout> = {
        title: {
            text: 'Test Plotly Graph'
        },
        xaxis: {
            title: {
                text: 'X Values'
            }
        },
        yaxis: {
            title: {
                text: 'Y Values'
            }
        },
        autosize: true
    };

    // Defines the behavior of the Plotly graph.
    const graphConfig: Partial<Config> = {
        responsive: true,
        scrollZoom: true,
        displayModeBar: true
    };

    // Renders the Plotly graph.
    Plotly.newPlot(_htmlTag, graphData, graphLayout, graphConfig);
}

