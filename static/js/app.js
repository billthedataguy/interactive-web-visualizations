// app.js

// Data endpoint url

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Define global variables

let dataCache;
let selector;

let sampleValues;
let sampleLabels;

let otuIds;
let otuLabels;

let washFreq;
let names;

// ***************************************************************************

// Function called by changes to Test Subject ID No. dropdown (id="selDataset")

function optionChanged(sel) {
               
    selector = sel;

    renderTable();
    makeBarChart();
    makeBubbleChart();
    makeGaugeChart();
   
}

// ***************************************************************************

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

function renderTable() {
    let demographicData = dataCache.metadata.filter(m => m.id == selector)[0];

    let keys = Object.keys(demographicData);
    // console.log("DEMOGRAPHIC KEYS: ", `${keys}`);

    let values = Object.values(demographicData);    
    // console.log("DEMOGRAPHIC VALUES: ", `${values}`);   

    d3.select("#demo-table").html("");
    let demoTable = d3.select("#demo-table").append("table").attr("class", "table table-striped");
        
    for (let i=0; i<keys.length; i++) {
        demoTable.append("tbody").append("tr").text(keys[i]).append("td").text(values[i]);
    }
}

// ***************************************************************************

function compareNumbers(a, b) {
    return b - a;
}

// ***************************************************************************

function makeBarChart() {    
    let sampleValues = dataCache.samples.filter(m => m.id == selector)[0]
        .sample_values.sort(compareNumbers)
        .slice(0,10)
        .reverse();

    let sampleLabels = dataCache.samples.filter(m => m.id == selector)[0]
        .otu_ids.sort(compareNumbers)
        .slice(0,10)
        .map((x) => ("OTU " + x))
        .reverse();           
        
    let otuLabels = dataCache.samples.filter(m => m.id == selector)[0]
        .otu_labels.sort(compareNumbers);

    // console.log("SAMPLE_VALUES = ", sampleValues);
    
    let trace = {
        x: sampleValues, 
        y: sampleLabels,
        type: "bar",
        orientation: "h",
        text: otuLabels
    };

    let layout = {        
        font:{
            family: "Courier"
        },
        showlegend: false,
        xaxis: {
            tickangle: -45
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
  
function makeGaugeChart() {

    let washFreq = dataCache.metadata.filter(m => m.id == selector)[0].wfreq;      

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

function makeBubbleChart() {

    let otuIds = dataCache.samples.filter(m => m.id == selector)[0]
        .otu_ids.sort(compareNumbers);              

    let sampleValues = dataCache.samples.filter(m => m.id == selector)[0]
        .sample_values.sort(compareNumbers);
        
    let otuLabels = dataCache.samples.filter(m => m.id == selector)[0]
        .otu_labels.sort(compareNumbers);

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

function init() {    
    d3.json(url).then( (fetchedData)=> {

        dataCache = fetchedData;    

        let names = fetchedData.names;
        selector = names[0];    

        let metadata = fetchedData.metadata;    
        let samples = fetchedData.samples;

        let otuIds = samples.filter(m => m.id == selector)[0]
            .otu_ids.sort(compareNumbers);              

        let sampleValues = samples.filter(m => m.id == selector)[0]
            .sample_values.sort(compareNumbers);

        let sampleLabels = dataCache.samples.filter(m => m.id == selector)[0]
            .otu_ids.sort(compareNumbers)
            .slice(0,10)
            .map((x) => ("OTU " + x))
            .reverse(); 
            
        let otuLabels = samples.filter(m => m.id == selector)[0]
            .otu_labels.sort(compareNumbers);
        
        let washFreq = metadata.filter(m => m.id == selector)[0].wfreq;     
         
        populateDropDownList();   
        makeBarChart();
        makeBubbleChart();
        makeGaugeChart();    
        renderTable(); 
                    
    }); 
             
}

init();
