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
    // Count the number of occurances of executions per state
    let stateCounts = data.reduce((count, item) => {
    let state = item.State;
    count[state] = (count[state] || 0) + 1;
    return count;
    }, {});
      
    // Extract state names and counts
    let stateNames = Object.keys(stateCounts);
    let counts = Object.values(stateCounts);
          
    // Sort the stateNames and counts arrays in descending order
    let sortedIndices = counts.map((_, index) => index).sort((a, b) => counts[b] - counts[a]);
    let states = sortedIndices.map(index => stateNames[index]);
    let sortedCounts = sortedIndices.map(index => counts[index]);
    
    if (dataset === 'Total') {
        // Create the trace for the chart
        let traces = [{
            x: states,
            y: sortedCounts,
            type: 'bar',
            marker: {color:'#79aaff'}
        }];
      
        // Create the layout configuration
        let layout = {
            paper_bgcolor:"#000000e",
            title: 'Executions by State',
            xaxis: {
              title: 'State',
            },
            yaxis: {
              title: 'Executions',
            },
        };
      
        // Plot the chart
        Plotly.newPlot('bargraph', traces, layout);
    }
    else if (dataset === 'Method') {
        //Color scheme for method
        let colors = ['#63bff0','#a7d5ed','#c23728','#e1a692','#de6e56'];
        
        //Set up the array for methods
        let methods = Array.from(new Set(data.map(item => item.Method))).sort();

        //map the methods to the states and set up the trace for the chart
        let traces = methods.map((method, index) => {
            let countPerState = states.map(state => {
                return data.reduce((count, item) => {
                return item.Method === method && item.State === state ? count + 1 : count;
                }, 0);
            });

            return {
                x: states,
                y: countPerState,
                type: 'bar',
                name: method,
                marker: {color: colors[index]}
            };
        });
        // Create the layout configuration
        let layout = {
            paper_bgcolor:"#000000e",
            title: 'Execution Methods Used by State',
            xaxis: {
                title: 'State'
                 
            },
            yaxis: {
                title: 'Executions'
            },
            barmode: "stack",
            legend: {'traceorder':'normal'}
            
        };
        let config = { responsive: true };
        
        // Plot the chart
        Plotly.newPlot('bargraph', traces, layout, config);
    }
    else if (dataset === 'Race') {
        //Color scheme for race
        let colors = ["#C5E063", "#6EB257", "#4AAD52", "#488B49", "#507255",  "#6cd4c5"];
        
        //map the races to the states and set up the trace for the chart
        let races = Array.from(new Set(data.map(item => item.Race))).sort();
        let traces = races.map((race, index) => {
            let countPerState = states.map(state => {
                return data.reduce((count, item) => {
                return item.Race === race && item.State === state ? count + 1 : count;
                }, 0);
            });

            return {
                x: states,
                y: countPerState,
                type: 'bar',
                name: race,
                marker: {color: colors[index]}
            };
        });
        // Create the layout configuration
        let layout = {
            paper_bgcolor:"#000000e",
            title: 'Executions by Race per State',
            xaxis: {
                title: 'State'
            },
            yaxis: {
                title: 'Executions'
            },
            barmode: "stack",
            legend: {'traceorder':'normal'}
        };
        let config = { responsive: true };
        
        // Plot the chart
        Plotly.newPlot('bargraph', traces, layout, config);
    }
    else if (dataset === 'Sex') {
        //Color scheme for method
        let colors = ['#3E78B2','#4A525A'];

        //map the sexes to the states and set up the trace for the chart
        let sexes = Array.from(new Set(data.map(item => item.Sex))).sort();
        sexes.reverse();
        let traces = sexes.map((sex, index) => {
            let countPerState = states.map(state => {
                return data.reduce((count, item) => {
                return item.Sex === sex && item.State === state ? count + 1 : count;
                }, 0);
            });

            return {
                x: states,
                y: countPerState,
                type: 'bar',
                name: sex,
                marker: {color: colors[index]}
            };
        });
        // Create the layout configuration
        let layout = {
            paper_bgcolor:"#000000e",
            title: 'Executions by Sex per State',
            xaxis: {
                title: 'State'
            },
            yaxis: {
                title: 'Executions'
            },
            barmode: "stack",
            legend: {'traceorder':'normal'}
        };
        let config = { responsive: true };
        
        // Plot the chart
        Plotly.newPlot('bargraph', traces, layout, config);
    }
}
//##################################################
//Pie Chart
function makePieChart(data, dataset) {
    if (dataset === 'Total') {
        //Color scheme for age groups
        let colors = ['#cdddff','#89bbff', '#79aaff', '#6697ff', '#4a8dff', '#0C56BC'];

        //set up a dictionary for the age groups and set up the count
        let ageGroups = {"Under 30": 0, "30s":0, "40s": 0, "50s": 0, "60s": 0,"70 and Older": 0};
        data.forEach(function(item) {
            let age = item.Age;
            if (age < 30) {
                ageGroups["Under 30"]++;
            } else if (age <= 30 && age <40) {
                ageGroups["30s"]++;
            } else if (age <= 40 && age <50) {
                ageGroups["40s"]++;
            }  else if (age <= 50 && age <60) {
                ageGroups["50s"]++;
            } else if (age <= 60 && age <70) {
                ageGroups["60s"]++;
            } else {
                ageGroups["70 and Older"]++;
            };
        });

        // Extract the unique age grouos and their respective counts
        let ageGroupNames = Object.keys(ageGroups);
        let ageGroupValues = Object.values(ageGroups);
        
        // Create the trace for the pie chart
        let trace = {
            type: 'pie',
            labels: ageGroupNames,
            values: ageGroupValues,
            textinfo: 'label+percent',
            insidetextorientation: 'horizontal',
            marker: {colors: colors},
            hoverinfo: 'label+value+percent',
            hole: .4,
            rotation: 90,
            sort: false
        };

        // Create the data array and layout configuration
        let pieData = [trace];
        let layout = {
            paper_bgcolor:"#000000e",
        title: 'Age Ranges of Executed',
        };

        // Plot the chart
        Plotly.newPlot('piechart', pieData, layout);
    }   
    else if (dataset === 'Method') {
        //Color scheme for method
        let colors = ['#63bff0','#a7d5ed','#c23728','#e1a692','#de6e56'];

        //Organize Method alphabetically
        let methods = data.map(item => item.Method).sort();

        // Count the occurrences of each Method
        let methodCounts = {};
        methods.forEach(function(method) {
        methodCounts[method] = (methodCounts[method] || 0) + 1;
        });

        // Extract the unique Methods and their respective counts
        let methodNames = Object.keys(methodCounts);
        let methodValues = Object.values(methodCounts);

        // Create the trace for the pie chart
        let trace = {
            type: 'pie',
            labels: methodNames,
            values: methodValues,
            textinfo: 'label+percent',
            insidetextorientation: 'horizontal',
            hoverinfo: 'label+value+percent',
            hole: .4,
            marker: {colors: colors},
            rotation: 90,
            sort: false    
        };

        // Create the data array and layout configuration
        let pieData = [trace];

        let layout = {
            paper_bgcolor:"#000000e",
            title: 'Total Executions by Method'
        };

        // Plot the chart
        Plotly.newPlot('piechart', pieData, layout);
    }   
    else if (dataset === 'Race') {
        //Color scheme for race
        let colors = ["#C5E063", "#6EB257", "#4AAD52", "#488B49", "#507255",  "#6cd4c5"];
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
            insidetextorientation: 'horizontal',
            hoverinfo: 'label+value+percent',
            hole: .4,
            marker: {colors: colors},
            rotation: 90,
            sort: false   
        };

        // Create the data array and layout configuration
        let pieData = [trace];
        let layout = {
            paper_bgcolor:"#000000e",
        title: 'Total Executions by Race',
        };

        // Plot the chart
        Plotly.newPlot('piechart', pieData, layout);
    }
    else if (dataset === 'Sex') {
        //Color scheme for sex
        let colors = ['#3E78B2','#4A525A'];
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
            insidetextorientation: 'horizontal',
            hoverinfo: 'label+value+percent',
            hole: .4,
            marker: {colors: colors},
            rotation: 90,
            sort: false
        };

        // Create the data array and layout configuration
        let pieData = [trace];
        let layout = {
            paper_bgcolor:"#000000e",
        title: 'Total Executions by Sex',
        };

        // Plot the chart
        Plotly.newPlot('piechart', pieData, layout);
    }  
}

//##################################################
//LINE GRAPH
function makeLineGraph(data, dataset) {
    //Make an array of the years where an execution took place
    let years = Array.from(new Set(data.map(item => item.Year)));
    
    if (dataset === 'Total') {
        //Map the count of executions per year to the year
        let countPerYear = years.map(year => {
            return data.reduce((count, item) => {
            return item.Year === year ? count + 1 : count;}, 
            0);
        });

        // Create the trace for the line graph
        let traces = [{
            x: years,
            y: countPerYear,
            mode: 'lines+markers',
            type: 'scatter',
            marker: {color:'#79aaff'}
        }];
        
        // Create the layout configuration
        let layout = {
            paper_bgcolor:"#000000e",
            title: 'Executions per Year',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Executions'
            }
        };
        
        let config = { responsive: true };
        // Plot the chart
        Plotly.newPlot('lineplot', traces, layout, config);
    }
    else if (dataset === 'Method') {
        //Color scheme for method
        let colors = ['#63bff0','#a7d5ed','#c23728','#e1a692','#de6e56'];

        //map the methods to the states and set up the trace for the chart
        let methods = Array.from(new Set(data.map(item => item.Method))).sort();
        let traces = methods.map((method, index) => {
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
                name: method,
                marker: {color: colors[index]}
            };
        });

        // Create the layout configuration
        let layout = {
            paper_bgcolor:"#000000e",
            title: 'Executions by Method per Year',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Executions'
            },
            legend: {'traceorder':'normal'}
        };
        let config = { responsive: true };

        // Plot the chart
        Plotly.newPlot('lineplot', traces, layout, config);
    }
    else if (dataset === 'Race') {
        //Color scheme for race
        let colors = ["#C5E063", "#6EB257", "#4AAD52", "#488B49", "#507255",  "#6cd4c5"];
        
        //map the races to the states and set up the trace for the chart
        let races = Array.from(new Set(data.map(item => item.Race))).sort();
        let traces = races.map((race, index) => {
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
                name: race,
                marker: {color: colors[index]}
            };
        });

        // Create the layout configuration
        let layout = {
            paper_bgcolor:"#000000e",
            title: 'Executions by Race per Year',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Executions'
            },
            legend: {'traceorder':'normal'}
        };
        let config = { responsive: true };
        
        Plotly.newPlot('lineplot', traces, layout, config);
    }
    else if (dataset === 'Sex') {
        //Color scheme for sex
        let colors = ['#3E78B2','#4A525A'];
        
        //map the sexes to the states and set up the trace for the chart
        let sexes = Array.from(new Set(data.map(item => item.Sex))).sort();
        sexes.reverse();
        let traces = sexes.map((sex, index) => {
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
                name: sex,
                marker: {color: colors[index]}
            };
        });

        // Create the layout configuration
        let layout = {
            paper_bgcolor:"#000000e",
            title: 'Executions by Sex per Year',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Executions'
            },
            legend: {'traceorder':'normal'}
        };
        let config = { responsive: true };
        
        // Plot the chart
        Plotly.newPlot('lineplot', traces, layout, config);
        };
    }