const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let dataCache;
let selector;




function optionChanged(sel) {

    selector = sel;

    let demoData = dataCache.metadata.filter(m => m.id == sel)[0];

    let demoKeys = Object.keys(demoData);
    console.log("DEMO KEYS: ", `${demoKeys}`);

    let demoValues = Object.values(demoData);    
    console.log("DEMO VALUES: ", `${demoValues}`);   
    
    renderTable(demoKeys, demoValues);
    makeBarChart();

}

function populateDropDownList() {

    let dropDownList = d3.select("#selDataset");
    dropDownList.selectAll("option")
        .data(dataCache.names)
        .enter()
        .append("option")
        .text(function(d) {return d; })
        .attr("value", function(d) {return d; });  

}

function renderTable(keys, vals) {

    d3.select("#demo-table").html("");
    let demoTable = d3.select("#demo-table").append("table").attr("class", "table table-striped");
    demoTable.append("tbody").append("tr").text(keys[0]).append("td").text(vals[0]);
    demoTable.append("tbody").append("tr").text(keys[1]).append("td").text(vals[1]);
    demoTable.append("tbody").append("tr").text(keys[2]).append("td").text(vals[2]);
    demoTable.append("tbody").append("tr").text(keys[3]).append("td").text(vals[3]);
    demoTable.append("tbody").append("tr").text(keys[4]).append("td").text(vals[4]);
    demoTable.append("tbody").append("tr").text(keys[5]).append("td").text(vals[5]);
    
        

}


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


function makeBarChart() {

    let sampleValues = dataCache.samples.filter(m => m.id == selector)[0].sample_values.slice(0,10);
    let sampleLabels = dataCache.samples.filter(m => m.id == selector)[0].otu_labels.slice(0,10);
    
    // sampleLabels = sampleLabels.map((x) => ("OTU " + x));

    console.log("SAMPLE_VALUES = ", sampleValues);
    
    let trace1 = {
      x: sampleValues, 
      y: sampleLabels,
      type: "bar",
      orientation: "h"
    };
  
    let data = [trace1];

    Plotly.newPlot("barchart", data);

  }
  


loadJson();
