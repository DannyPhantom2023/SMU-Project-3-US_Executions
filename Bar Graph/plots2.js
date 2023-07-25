console.log(searchResults);
var xValue = searchResults.map(row => row.State);

var yValue = searchResults.map(row => row.DeathsByState);

var trace1 = {
  x: xValue,
  y: yValue,
  type: 'bar',
  text: yValue.map(String),
  textposition: 'auto',
  hoverinfo: 'none',
  marker: {
    color: '#83992a',
    opacity: 0.6,
    line: {
      color: '#212121',
      width: 2.5
    }
  }
};

var data = [trace1];

var layout = {
  title: 'Deaths By State',
  barmode: 'stack'
};

Plotly.newPlot('plot', data, layout);