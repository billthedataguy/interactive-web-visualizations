// app.js

// Data endpoint url

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Define global variables

let dataCache;
let selector;

// ***************************************************************************

// Function called by changes to Test Subject ID No. dropdown (id="selDataset")

function optionChanged(sel) {

    // Clear the console to see new data for this selection
    console.clear();
    console.log("SEL: ", sel);

    selector = sel;
    console.log("SELECTOR: ", selector);

    // Make table and charts
    renderTable();
    makeBarChart();
    makeBubbleChart();
    makeGaugeChart();
   
}

// ***************************************************************************

// Function to populate values in Test Subject ID No. dropdown (id="selDataset")

function populateDropDownList() {
    let dropDownList = d3.select("#selDataset");

    dropDownList.selectAll("option")
        .data(dataCache.names)
        .enter()
        .append("option")
        .text(function(d) {return d; })
        .attr("value", function(d) {return d; });  
}

// ***************************************************************************

// Function to populate table with demographic data

function renderTable() {
    let demographicData = dataCache.metadata.filter(m => m.id == selector)[0];
    console.log("DEMOGRAPHICDATA: ", demographicData);

    let keys = Object.keys(demographicData);
    console.log("DEMOGRAPHIC KEYS: ", keys);

    let values = Object.values(demographicData);    
    console.log("DEMOGRAPHIC VALUES: ", values);   

    d3.select("#demo-table").html("");
    let demoTable = d3.select("#demo-table").append("table").attr("class", "table table-striped");
        
    for (let i=0; i<keys.length; i++) {
        demoTable.append("tbody").append("tr").text(keys[i]).append("td").text(values[i]);
    }
}

// ***************************************************************************

// Sorting function

function compareNumbers(a, b) {
    return b - a;
}

// ***************************************************************************

// Function to create Plotly barchart

function makeBarChart() {    
    let sampleValuesTop10 = dataCache.samples.filter(m => m.id == selector)[0]
        .sample_values.sort(compareNumbers)
        .slice(0,10)
        .reverse();
    console.log("SAMPLE_VALUES_TOP10: ", sampleValuesTop10);

    let sampleLabelsTop10 = dataCache.samples.filter(m => m.id == selector)[0]
        .otu_ids.sort(compareNumbers)
        .slice(0,10)
        .map((x) => ("OTU " + x))
        .reverse();           
    console.log("SAMPLE_LABELS_TOP10: ", sampleLabelsTop10);
        
    let otuLabelsTop10 = dataCache.samples.filter(m => m.id == selector)[0]
        .otu_labels.sort(compareNumbers)
        .slice(0,10)
        .reverse();
    console.log("OTU_LABELS_TOP10: ", otuLabelsTop10);
    
    let trace = {
        x: sampleValuesTop10, 
        y: sampleLabelsTop10,
        type: "bar",
        orientation: "h",
        text: otuLabelsTop10
    };

    let layout = {        
        font:{
            family: "Courier"
        },
        showlegend: false,
        xaxis: {
            tickangle: 45
        },
        yaxis: {
            zeroline: false,
            gridwidth: 2
        },
        bargap :0.05
    };
  
    let data = [trace];

    Plotly.newPlot("barchart", data, layout);
  }

// ***************************************************************************

// Function to create Plotly gauge chart

function makeGaugeChart() {

    let washFreq = dataCache.metadata.filter(m => m.id == selector)[0].wfreq;   
    console.log("WASHFREQ: ", washFreq);   

    let data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,            
            type: "indicator",
            mode: "gauge+number",
            // delta: { reference: 10 },
            gauge: { axis: {range: [0, 10] } }
        }
    ];
    
    let layout = { 
        width: 500, 
        height: 250, 
        margin: { 
                    t: 0, 
                    b: 0 
                },
        font:{
               family: "Courier"
             } 
        };

    Plotly.newPlot("gaugechart", data, layout);       
}

// ***************************************************************************

// Function to create Plotly bubble chart

function makeBubbleChart() {

    let otuIds = dataCache.samples.filter(m => m.id == selector)[0]
        .otu_ids.sort(compareNumbers);  
    console.log("OTUIDS: ", otuIds);      
    
    let sampleValues = dataCache.samples.filter(m => m.id == selector)[0]
        .sample_values.sort(compareNumbers);
    console.log("SAMPLEVALUES: ", sampleValues);   
        
    let otuLabels = dataCache.samples.filter(m => m.id == selector)[0]
        .otu_labels.sort(compareNumbers);
    console.log("OTULABELS: ", otuLabels);   

    let trace = {
        x: otuIds,
        y: sampleValues,
        mode: "markers",
        marker: {
                    size: sampleValues,
                    color: otuIds,                    
                    colorscale: [
                        [0, "rgb(166,206,227)"], 
                        [0.25, "rgb(31,120,180)"], 
                        [0.45, "rgb(178,223,138)"], 
                        [0.65, "rgb(51,160,44)"], 
                        [0.85, "rgb(251,154,153)"], 
                        [1, "rgb(227,26,28)"]            
                    ]
                },
        text: otuLabels            
    };
      
    let data = [trace];
    
    let layout = {    
        showlegend: false,
        height: 1000,
        width: 1260,
        xaxis:  { title: { text: "OTU ID" } },
        font: {
                    family: "Courier"
              } 
     
    };
      
    Plotly.newPlot("bubblechart", data, layout);
}  

// ***************************************************************************

// Starter function to load json, populate dropdown list, and make default charts

function init() {    
    d3.json(url).then( (fetchedData)=> {

        dataCache = fetchedData;  
        console.log("DATACACHE: ", dataCache);
  
        let names = fetchedData.names;
        console.log("NAMES: ", names);

        // Choose first selection in dropdown list as the default
        selector = names[0];    
        console.log("SELECTOR: ", selector);
                 
        populateDropDownList();   

        makeBarChart();
        makeBubbleChart();
        makeGaugeChart();    
        renderTable(); 
                    
    }); 
             
}

init();