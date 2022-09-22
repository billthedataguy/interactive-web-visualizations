// app.js

const dataUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use the D3 library to read in samples.json from the URL

// Fetch the JSON data and console log it

d3.json(dataUrl).then(function(data) {
   
  let names = Object.values(data.names);
  let metadata = Object.values(data.metadata);
  let samples = Object.values(data.samples);

  let nineSixty = names.filter(x => x == 960);
  let nineSixtyMetadata = metadata.filter(x => (x.id == `${nineSixty}`))[0];

  console.log(nineSixty);
  console.log(nineSixtyMetadata);
  console.log(`${nineSixtyMetadata.id}`);
  console.log(`${nineSixtyMetadata.ethnicity}`);
  console.log(`${nineSixtyMetadata.gender}`);
  console.log(`${nineSixtyMetadata.age}`);
  console.log(`${nineSixtyMetadata.location}`);
  console.log(`${nineSixtyMetadata.bbtype}`);
  console.log(`${nineSixtyMetadata.wfreq}`);



  // 
  // console.log(samples.filter(x => x.id == 960));

               

});

let xData1 = [1, 2, 3, 4, 5];
let yData1 = ["one", "two", "three", "four", "five"];


let trace1 = {
  x: xData1,
  y: yData1,
  type: 'bar',
  orientation: 'h'
};

let data1 = [trace1];

let layout1 = {
  title: "A Plotly plot"
};

Plotly.newPlot("barchart", data1);


let xData2 = [1, 2, 3, 4, 5];
let yData2 = [1, 2, 4, 8, 16];


let trace2 = {
    values: xData2,
    labels: yData2,    
    type: 'pie'
  };
 
  let data2 = [trace2];
 
  let layout2 = {
    title: "A Plotly plot"
  };
 
  Plotly.newPlot("piechart", data2, layout2);


  let trace3 = {
      x: [1, 2, 3, 4],
      y: [10, 11, 12, 13],
      mode: 'markers',
      marker: {
        size: [40, 60, 80, 100]
      }
    };
   
    let data3 = [trace3];
   
    let layout3 = {
      title: 'Marker Size',
      showlegend: false,
      height: 500,
      width: 1250
    };
   
    Plotly.newPlot("bubblechart", data3, layout3);