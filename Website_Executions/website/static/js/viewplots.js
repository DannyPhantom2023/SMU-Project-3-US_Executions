let url = "/api/v1.0/Execution_Data";

d3.json(url).then(function(input) {
    console.log(input);
    let data = input.raw_data;
    console.log(data)
    data.sort((a, b) => a.Year - b.Year);
    dataset = 'Total';
    makeBarGraph(data, dataset);
    makePieChart(data, dataset);
    makeLineGraph(data, dataset);
});


d3.selectAll("#selDataset").on("change", updateDropdown);


function updateDropdown() {
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");
    console.log(dataset);
    
    d3.json(url).then(function(input) {
        console.log(input)
        let data = input.raw_data;
        console.log(data)
        data.sort((a, b) => a.Year - b.Year);
        makeBarGraph(data, dataset);
        makePieChart(data, dataset);
        makeLineGraph(data, dataset);
    });
}
//##################################################
//Bar Graph
function makeBarGraph(data, dataset) {
    let stateCounts = data.reduce((count, item) => {
    let state = item.State;
    count[state] = (count[state] || 0) + 1;
    return count;
    }, {});
  
      // Extract state names and counts
    let stateNames = Object.keys(stateCounts);
    let counts = Object.values(stateCounts);
      
    // Sort the stateNames and counts arrays in descending order
    let sortedIndices = counts.map((_, index) => index)
                            .sort((a, b) => counts[b] - counts[a]);
    let states = sortedIndices.map(index => stateNames[index]);
    let sortedCounts = sortedIndices.map(index => counts[index]);
    console.log(states);

if (dataset === 'Total') {
      
      // Create the trace for the bar chart
    let traces = [{
        x: states,
        y: sortedCounts,
        type: 'bar',
    }];
  
      // Layout configuration
    let layout = {
        title: 'Number of Executions by State',
        xaxis: {
          title: 'Number of Executions',
        },
        yaxis: {
          title: 'State',
        },
    };
  
      // Plot the chart
    Plotly.newPlot('bargraph', traces, layout);
}
else if (dataset === 'Method') {
    let colors = ['red','blue', 'green','yellow','purple'];
    let methods = Array.from(new Set(data.map(item => item.Method))).sort();
    console.log(methods);
    let traces = methods.map((method, index) => {
        let countPerState = states.map(state => {
            return data.reduce((count, item) => {
            return item.Method === method && item.State === state ? count + 1 : count;
            }, 0);
        });
        console.log(countPerState);
        console.log(states);
        return {
            x: states,
            y: countPerState,
            type: 'bar',
            name: method,
            marker: {color: colors[index]}
        };
    });
    let layout = {
        title: 'Count per Year by Method',
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Count'
        },
        barmode: "stack",
        legend: {'traceorder':'normal'}
    };
    let config = { responsive: true };
    
    Plotly.newPlot('bargraph', traces, layout, config);
}
else if (dataset === 'Race') {
    let colors = ['red','blue', 'green','yellow','orange', 'purple'];
    let races = Array.from(new Set(data.map(item => item.Race))).sort();
    let traces = races.map((race, index) => {
        let countPerState = states.map(state => {
            return data.reduce((count, item) => {
            return item.Race === race && item.State === state ? count + 1 : count;
            }, 0);
        });
        console.log(countPerState);
        console.log(states);
        return {
            x: states,
            y: countPerState,
            type: 'bar',
            name: race,
            marker: {color: colors[index]}
        };
    });
    let layout = {
        title: 'Count per Year by Method',
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Count'
        },
        barmode: "stack",
        legend: {'traceorder':'normal'}
    };
    let config = { responsive: true };
    
    Plotly.newPlot('bargraph', traces, layout, config);
}
else if (dataset === 'Sex') {
    let colors = ['orange', 'purple'];
    let sexes = Array.from(new Set(data.map(item => item.Sex))).sort();
    sexes.reverse();
    let traces = sexes.map((sex, index) => {
        let countPerState = states.map(state => {
            return data.reduce((count, item) => {
            return item.Sex === sex && item.State === state ? count + 1 : count;
            }, 0);
        });
        console.log(countPerState);
        console.log(states);
        return {
            x: states,
            y: countPerState,
            type: 'bar',
            name: sex,
            marker: {color: colors[index]}
        };
    });
    let layout = {
        title: 'Count per Year by Method',
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Count'
        },
        barmode: "stack",
        legend: {'traceorder':'normal'}
    };
    let config = { responsive: true };
    
    Plotly.newPlot('bargraph', traces, layout, config);
}
}
//##################################################
//Pie Chart
function makePieChart(data, dataset) {
    if (dataset === 'Total') {
        let ages = data.map(item => item.Age);
        // Count the occurrences of each race
        let ageCounts = {};
        ages.forEach(function(age) {
        ageCounts[age] = (ageCounts[age] || 0) + 1;
        });
        // Extract the unique races and their respective counts
        let ageNames = Object.keys(ageCounts);
        let ageValues = Object.values(ageCounts);
        // Create the trace for the pie chart
        let trace = {
        type: 'pie',
        labels: ageNames,
        values: ageValues,
        textinfo: 'label+percent',
        insidetextorientation: 'radial',
        hoverinfo: 'label+value+percent',
        hole: .5
        };
        // Create the data array and layout for the pie chart
        let pieData = [trace];
        let layout = {
        title: 'Victim Counts by Method',
        };
        // Plot the pie chart
        Plotly.newPlot('piechart', pieData, layout);
    }   
    else if (dataset === 'Method') {
        let colors = ['red','blue', 'green','yellow','purple'];
        let methods = data.map(item => item.Method).sort();
        // Count the occurrences of each race
        let methodCounts = {};
        methods.forEach(function(method) {
        methodCounts[method] = (methodCounts[method] || 0) + 1;
        });
        // Extract the unique races and their respective counts
        let methodNames = Object.keys(methodCounts);
        let methodValues = Object.values(methodCounts);
        console.log(methodNames);
        // Create the trace for the pie chart
        let trace = {
        type: 'pie',
        labels: methodNames,
        values: methodValues,
        textinfo: 'label+percent',
        insidetextorientation: 'radial',
        hoverinfo: 'label+value+percent',
        hole: .4,
        marker: {colors: colors},
        sort: true    
        };
        // Create the data array and layout for the pie chart
        let pieData = [trace];
        let layout = {
            title: 'Victim Counts by Method'
        };
        // Plot the pie chart
        Plotly.newPlot('piechart', pieData, layout);
    }   
    else if (dataset === 'Race') {
        let colors = ['red','blue', 'green','yellow','orange', 'purple'];
        let races = data.map(item => item.Race).sort();
        // Count the occurrences of each race
        let raceCounts = {};
        races.forEach(function(race) {
        raceCounts[race] = (raceCounts[race] || 0) + 1;
        });
        // Extract the unique races and their respective counts
        let raceNames = Object.keys(raceCounts);
        let raceValues = Object.values(raceCounts);
        // Create the trace for the pie chart
        let trace = {
        type: 'pie',
        labels: raceNames,
        values: raceValues,
        textinfo: 'label+percent',
        insidetextorientation: 'radial',
        hoverinfo: 'label+value+percent',
        hole: .4,
        marker: {colors: colors},
        sort: true   
        };
        // Create the data array and layout for the pie chart
        let pieData = [trace];
        let layout = {
        title: 'Victim Counts by Race',
        };
        // Plot the pie chart
        Plotly.newPlot('piechart', pieData, layout);
   }
   else if (dataset === 'Sex') {
    let colors = ['orange', 'purple'];
    let sexes = data.map(item => item.Sex).sort();
    sexes.reverse();
    // Count the occurrences of each race
    let sexCounts = {};
    sexes.forEach(function(sex) {
    sexCounts[sex] = (sexCounts[sex] || 0) + 1;
    });
    // Extract the unique races and their respective counts
    let sexNames = Object.keys(sexCounts);
    let sexValues = Object.values(sexCounts);
    // Create the trace for the pie chart
    let trace = {
    type: 'pie',
    labels: sexNames,
    values: sexValues,
    textinfo: 'label+percent',
    insidetextorientation: 'radial',
    hoverinfo: 'label+value+percent',
    hole: .4,
    marker: {colors: colors},
    sort: true
    };
    // Create the data array and layout for the pie chart
    let pieData = [trace];
    let layout = {
    title: 'Victim Counts by Sex',
    };
    // Plot the pie chart
    Plotly.newPlot('piechart', pieData, layout);
    }  
}
//##################################################




function makeLineGraph(data, dataset) {
    let years = Array.from(new Set(data.map(item => item.Year)));
    
    if (dataset === 'Total') {
            let countPerYear = years.map(year => {
                return data.reduce((count, item) => {
                return item.Year === year ? count + 1 : count;
                }, 0);
            });

           traces = [ {
                x: years,
                y: countPerYear,
                mode: 'lines+markers',
                type: 'scatter',
            }];

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