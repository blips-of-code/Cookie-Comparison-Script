// Utility Functions
import Plotly from 'plotly.js-dist-min';

// Types
import type { Data, Layout, Config } from 'plotly.js-dist-min';



// -- Graph Functions --

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

