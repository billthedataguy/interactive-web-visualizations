const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let dataCache;
let selector;

// ***************************************************************************

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

    let demoData = dataCache.metadata.filter(m => m.id == selector)[0];

    let keys = Object.keys(demoData);
    console.log("DEMO keys: ", `${keys}`);

    let values = Object.values(demoData);    
    console.log("DEMO VALUES: ", `${values}`);   

    d3.select("#demo-table").html("");
    let demoTable = d3.select("#demo-table").append("table").attr("class", "table table-striped");
    demoTable.append("tbody").append("tr").text(keys[0]).append("td").text(values[0]);
    demoTable.append("tbody").append("tr").text(keys[1]).append("td").text(values[1]);
    demoTable.append("tbody").append("tr").text(keys[2]).append("td").text(values[2]);
    demoTable.append("tbody").append("tr").text(keys[3]).append("td").text(values[3]);
    demoTable.append("tbody").append("tr").text(keys[4]).append("td").text(values[4]);
    demoTable.append("tbody").append("tr").text(keys[5]).append("td").text(values[5]);           

}

// ***************************************************************************

function loadJson() {

    d3.json(url).then( (data)=> {

        dataCache = data;
    
        let names = data.names;
        console.log("NAMES: ", names.slice(0,10));
    
        let metadata = data.metadata;
        console.log("METADATA: ", metadata.slice(0,10));
    
        let samples = data.samples;
        console.log("SAMPLES: ", samples.slice(0,10));           
        
        populateDropDownList();
            
    });  

    
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

    console.log("SAMPLE_VALUES = ", sampleValues);
    
    let trace = {
      x: sampleValues, 
      y: sampleLabels,
      type: "bar",
      orientation: "h"
    };
  
    let data = [trace];

    // let layout = 

    Plotly.newPlot("barchart", data);

  }

// ***************************************************************************

function makeBubbleChart() {

    let otuIds = dataCache.samples.filter(m => m.id == selector)[0]
        .otu_ids.sort(compareNumbers);              

    let sampleValues = dataCache.samples.filter(m => m.id == selector)[0]
        .sample_values.sort(compareNumbers);
        
    let otuLabels = dataCache.samples.filter(m => m.id == selector)[0]
        .otu_labels.sort(compareNumbers);

    var trace = {

        x: otuIds,
        y: sampleValues,
        mode: "markers",
        marker: {
          size: sampleValues,
          color: otuIds
        },
        text: otuLabels
        
    };
      
    var data = [trace];
    
    var layout = {
    
        showlegend: false,
        height: 1000,
        width: 1200

    };
      
    Plotly.newPlot("bubblechart", data, layout);

}

// ***************************************************************************
  
function makeGaugeChart() {

    let washFreq = dataCache.metadata.filter(m => m.id == selector)[0].wfreq;      

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,            
            type: "indicator",
            mode: "gauge+number",
            // delta: { reference: 10 },
            gauge: { axis: {range: [0, 10] } }
        }
    ];
    
    var layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
    Plotly.newPlot("gaugechart", data, layout);
       
}
  

// ***************************************************************************


function init() {

    loadJson();    
    makeBarChart();
    makeBubbleChart();
    makeGaugeChart();    

}


init();
