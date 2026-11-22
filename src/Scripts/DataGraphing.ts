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

import google_runs from "../../public/data_views/websites/Google_all_runs.json";
import wiki_runs from "../../public/data_views/websites/Wiki_all_runs.json";
import mozilla_runs from "../../public/data_views/websites/Mozilla_all_runs.json";
import cnn_runs from "../../public/data_views/websites/Cnn_all_runs.json";

// -- Graph Functions --

interface PieChartData {
    data: Data[];
    layout: Partial<Layout>[];
}

export function make_piecharts_chrome(_htmlTags: string[]): void {
    const run1_layout: Partial<Layout> = {
            title: { text: "Chrome Run 1"},
            height: 400,
            width: 800,
            margin: {"t": 10, "b": 10, "l": 10, "r": 10},
            showlegend: false,
            grid: {rows: 1, columns: 4, subplots: ['xy','x2y','x3y','x4y'], pattern: 'independent'}
        };
    const run2_layout: Partial<Layout> = {
            title: { text: "Chrome Run 2"},
            height: 400,
            width: 800,
            margin: {"t": 10, "b": 10, "l": 10, "r": 10},
            showlegend: false,
            grid: {rows: 1, columns: 4, subplots: ['xy','x2y','x3y','x4y'], pattern: 'independent'}
        };
    const run3_layout: Partial<Layout> = {
            title: { text: "Chrome Run 3"},
            height: 400,
            width: 800,
            margin: {"t": 10, "b": 10, "l": 10, "r": 10},
            showlegend: false,
            grid: {rows: 1, columns: 4, subplots: ['xy','x2y','x3y','x4y'], pattern: 'independent'}
        };

    const graphConfig: Partial<Config> = {
        responsive: true,
        scrollZoom: true,
        displayModeBar: true,
    };

    const data_traces1: Data[] = [];
    chrome_run1.data.forEach(site => {
        data_traces1.push(site as Data);
    });

    const data_traces2: Data[] = [];
    chrome_run2.data.forEach(site => {
        data_traces2.push(site as Data);
    });

    const data_traces3: Data[] = [];
    chrome_run3.data.forEach(site => {
        data_traces3.push(site as Data);
    });

    Plotly.newPlot(_htmlTags[0], data_traces1, run1_layout);
    Plotly.newPlot(_htmlTags[1], data_traces2, run2_layout);
    Plotly.newPlot(_htmlTags[2], data_traces3, run3_layout);
}

export function make_piecharts_firefox(_htmlTags: string[]): void {
    const run1_layout: Partial<Layout> = {
            title: { text: "Firefox Run 1"},
            height: 400,
            width: 800,
            margin: {"t": 10, "b": 10, "l": 10, "r": 10},
            showlegend: false,
            grid: {rows: 1, columns: 4, subplots: ['xy','x2y','x3y','x4y'], pattern: 'independent'}
        };
    const run2_layout: Partial<Layout> = {
            title: { text: "Firefox Run 2"},
            height: 400,
            width: 800,
            margin: {"t": 10, "b": 10, "l": 10, "r": 10},
            showlegend: false,
            grid: {rows: 1, columns: 4, subplots: ['xy','x2y','x3y','x4y'], pattern: 'independent'}
        };
    const run3_layout: Partial<Layout> = {
            title: { text: "Firefox Run 3"},
            height: 400,
            width: 800,
            margin: {"t": 10, "b": 10, "l": 10, "r": 10},
            showlegend: false,
            grid: {rows: 1, columns: 4, subplots: ['xy','x2y','x3y','x4y'], pattern: 'independent'}
        };

    const graphConfig: Partial<Config> = {
        responsive: true,
        scrollZoom: true,
        displayModeBar: true,
    };

    const data_traces1: Data[] = [];
    ffox_run1.data.forEach(site => {
        data_traces1.push(site as Data);
    });

    const data_traces2: Data[] = [];
    ffox_run2.data.forEach(site => {
        data_traces2.push(site as Data);
    });

    const data_traces3: Data[] = [];
    ffox_run3.data.forEach(site => {
        data_traces3.push(site as Data);
    });

    Plotly.newPlot(_htmlTags[0], data_traces1, run1_layout);
    Plotly.newPlot(_htmlTags[1], data_traces2, run2_layout);
    Plotly.newPlot(_htmlTags[2], data_traces3, run3_layout);

}

export function make_piecharts_webkit(_htmlTags: string[]): void {
    //console.log(chrome_run1[0].data, chrome_run1[0].layout);
const run1_layout: Partial<Layout> = {
            title: { text: "Webkit Run 1"},
            height: 400,
            width: 800,
            margin: {"t": 10, "b": 0, "l": 10, "r": 10},
            showlegend: false,
            grid: {rows: 1, columns: 4, subplots: ['xy','x2y','x3y','x4y'], pattern: 'independent'}
        };
    const run2_layout: Partial<Layout> = {
            title: { text: "Webkit Run 2"},
            height: 400,
            width: 800,
            margin: {"t": 10, "b": 0, "l": 10, "r": 10},
            showlegend: false,
            grid: {rows: 1, columns: 4, subplots: ['xy','x2y','x3y','x4y'], pattern: 'independent'}
        };
    const run3_layout: Partial<Layout> = {
            title: { text: "Webkit Run 3"},
            height: 400,
            width: 800,
            margin: {"t": 10, "b": 0, "l": 10, "r": 10},
            showlegend: false,
            grid: {rows: 1, columns: 4, subplots: ['xy','x2y','x3y','x4y'], pattern: 'independent'}
        };

    // const graphConfig: Partial<Config> = {
    //     responsive: true,
    //     scrollZoom: true,
    //     displayModeBar: true,
    // };

    const data_traces1: Data[] = [];
    webkit_run1.data.forEach(site => {
        data_traces1.push(site as Data);
    });

    const data_traces2: Data[] = [];
    webkit_run2.data.forEach(site => {
        data_traces2.push(site as Data);
    });

    const data_traces3: Data[] = [];
    webkit_run3.data.forEach(site => {
        data_traces3.push(site as Data);
    });

    Plotly.newPlot(_htmlTags[0], data_traces1, run1_layout);
    Plotly.newPlot(_htmlTags[1], data_traces2, run2_layout);
    Plotly.newPlot(_htmlTags[2], data_traces3, run3_layout);
}

export function make_piechart_website(_htmlTags: string[], _website: string): void {
    if(_website == "Google"){
        const runcount:number = 0;
        //for each run
        google_runs.forEach(element => {
            const run_traces: Data[] = [];
            const run_layouts: Partial<Layout>[] = [];
            
            element.data.forEach(data_element => {
                run_traces.push(data_element as Data);
            });
            element.layout.forEach(layout_element => {
                run_layouts.push(layout_element as Partial<Layout>);
            });
            Plotly.newPlot(_htmlTags[runcount], run_traces, run_layouts[runcount]);
            // element.forEach(element => {
                
            // });
            // run_traces.push(element.data as Data);
        }); 
    }
    else if(_website == "Wikipedia"){
        const runcount:number = 0;
        //for each run
        wiki_runs.forEach(element => {
            const run_traces: Data[] = [];
            const run_layouts: Partial<Layout>[] = [];
            
            element.data.forEach(data_element => {
                run_traces.push(data_element as Data);
            });
            element.layout.forEach(layout_element => {
                run_layouts.push(layout_element as Partial<Layout>);
            });
            Plotly.newPlot(_htmlTags[runcount], run_traces, run_layouts[runcount]);
            // element.forEach(element => {
                
            // });
            // run_traces.push(element.data as Data);
        }); 
    }
    else if(_website == "Mozilla"){
        const runcount:number = 0;
        //for each run
        mozilla_runs.forEach(element => {
            const run_traces: Data[] = [];
            const run_layouts: Partial<Layout>[] = [];
            
            element.data.forEach(data_element => {
                run_traces.push(data_element as Data);
            });
            element.layout.forEach(layout_element => {
                run_layouts.push(layout_element as Partial<Layout>);
            });
            Plotly.newPlot(_htmlTags[runcount], run_traces, run_layouts[runcount]);
            // element.forEach(element => {
                
            // });
            // run_traces.push(element.data as Data);
        }); 
    }
    else if(_website == "CNN"){
        const runcount:number = 0;
        //for each run
        cnn_runs.forEach(element => {
            const run_traces: Data[] = [];
            const run_layouts: Partial<Layout>[] = [];
            
            element.data.forEach(data_element => {
                run_traces.push(data_element as Data);
            });
            element.layout.forEach(layout_element => {
                run_layouts.push(layout_element as Partial<Layout>);
            });
            Plotly.newPlot(_htmlTags[runcount], run_traces, run_layouts[runcount]);
            // element.forEach(element => {
                
            // });
            // run_traces.push(element.data as Data);
        }); 
    }
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

