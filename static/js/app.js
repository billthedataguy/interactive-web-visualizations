// app.js

const dataUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use the D3 library to read in samples.json from the URL

// Fetch the JSON data and console log it

d3.json(dataUrl).then(function(data) {
  console.log(data.names);
  console.log(data.metadata);
  console.log(data.samples);
});

