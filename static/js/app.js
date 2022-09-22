// app.js

const dataUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use the D3 library to read in samples.json from the URL

// Fetch the JSON data and console log it

d3.json(dataUrl).then(function(data) {
   
  let names = Object.values(data.names);
  let metadata = Object.values(data.metadata);
  let samples = Object.values(data.samples);


  console.log("Num of names: ", `${names.length}`)

  let aNavel = names.filter(x => x == 960);
  let aNavelMetadata = metadata.filter(x => (x.id == `${aNavel}`))[0];
  let aNavelSamples = samples.filter(x => (x.id == `${aNavel}`))[0];

  let otuIds = `${aNavelSamples.otu_ids}`;
  let otuLabels = `${aNavelSamples.otu_labels}`

  let sampleValues = `${aNavelSamples.sample_values}`;

  let id = `${aNavelMetadata.id}`;
  let ethnicity = `${aNavelMetadata.ethnicity}`;
  let gender = `${aNavelMetadata.gender}`;
  let age = `${aNavelMetadata.age}`;
  let location = `${aNavelMetadata.location}`;
  let bbtype = `${aNavelMetadata.bbtype}`;
  let wfreq = `${aNavelMetadata.wfreq}`;




  

  console.log("ID: ", `${id}`);
  console.log("Ethnicity: ", `${ethnicity}`);
  console.log("Gender: ", `${gender}`);
  console.log("Age: ", `${age}`);
  console.log("Location: ", `${location}`);
  console.log("bbtype: ", `${bbtype}`);
  console.log("wfreq: ", `${wfreq}`);

  console.log("Otu_ids: ", `${otuIds}`);
  console.log("Otu_labels: ", `${otuLabels}`);
  console.log("Sample_values: ", `${sampleValues}`);

});