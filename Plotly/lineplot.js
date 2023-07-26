d3.json('executions.json').then(function(data) {
    data.sort((a, b) => a.Year - b.Year);
    dataset = 'Total';
    makeLineGraph(data,dataset);
});


d3.selectAll("#selDataset").on("change", updateDropdown);


function updateDropdown() {
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");
    console.log(dataset);
    
    d3.json('executions.json').then(function(data) {
        data.sort((a, b) => a.Year - b.Year);
        makeLineGraph(data,dataset);
    });
}

function makeLineGraph(data, dataset) {
    let years = Array.from(new Set(data.map(item => item.Year)));
    
    if (dataset === 'Total') {
        let traces = years.map(year => {
            let countPerYear = years.map(year => {
                return data.reduce((count, item) => {
                return item.Year === year ? count + 1 : count;
                }, 0);
            });

            return {
                x: years,
                y: countPerYear,
                mode: 'lines+markers',
                type: 'scatter',
                name: year
            };
        });

        let layout = {
            title: 'Count per Year',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Count'
            }
        };
        let config = { responsive: true };
        
        Plotly.newPlot('lineplot', traces, layout, config);
    }
   else if (dataset === 'Method') {
        let methods = Array.from(new Set(data.map(item => item.Method)));
        let traces = methods.map(method => {
            let countPerYear = years.map(year => {
                return data.reduce((count, item) => {
                return item.Method === method && item.Year === year ? count + 1 : count;
                }, 0);
            });

            return {
                x: years,
                y: countPerYear,
                mode: 'lines+markers',
                type: 'scatter',
                name: method
            };
        });

        let layout = {
            title: 'Count per Year by Method',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Count'
            }
        };
        let config = { responsive: true };
        
        Plotly.newPlot('lineplot', traces, layout, config);
    }
    else if (dataset === 'Race') {

        let races = Array.from(new Set(data.map(item => item.Race)));
        let traces = races.map(race => {
            let countPerYear = years.map(year => {
                return data.reduce((count, item) => {
                return item.Race === race && item.Year === year ? count + 1 : count;
                }, 0);
            });

            return {
                x: years,
                y: countPerYear,
                mode: 'lines+markers',
                type: 'scatter',
                name: race
            };
        });

        let layout = {
            title: 'Count per Year by Race',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Count'
            }
        };
        let config = { responsive: true };
        
        Plotly.newPlot('lineplot', traces, layout, config);
    }
    else if (dataset === 'Sex') {

        let sexes = Array.from(new Set(data.map(item => item.Sex)));
        let traces = sexes.map(sex => {
            let countPerYear = years.map(year => {
                return data.reduce((count, item) => {
                return item.Sex === sex && item.Year === year ? count + 1 : count;
                }, 0);
            });

            return {
                x: years,
                y: countPerYear,
                mode: 'lines+markers',
                type: 'scatter',
                name: sex
            };
        });

        let layout = {
            title: 'Count per Year by Sex',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Count'
            }
        };
        let config = { responsive: true };
        
        Plotly.newPlot('lineplot', traces, layout, config);
        };
    }