# **interactive-web-visualizations**

## William Vann
## Homework 14 - **Interactive Plots with D3 and Plotly**
<hr>


### **Methodology**



1. app.js loads the Belly Button Biodiversity dataset in as JSON from the endpoint url:

- [https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json](https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json)
      
2. JSON is parsed and rendered into a _dropdown selector_ in [index.html](index.html)

3. JSON is parsed and rendered into a _demographics table_ in [index.html](index.html) for the id selected

4. JSON is parsed and rendered into the following Plotly plots in [index.html](index.html) for the id selected:

- _horizontal bar chart_ of top 10 operational taxonomic units, or OTUs, for id selected
- _gauge chart_ visualizing belly button washing frequency for id selected
- _bubble chart_ showing the dominant microbial species for id selected

### **Files in this Repo**



1. [app.js](/static/js/app.js)

        Contains all JavaScript logic for the interactive dashboard.

2. [index.html](index.html)

        Main dashboard html webpage.

3. [style.css](/static/css/style.css)

        Customized CSS added over the Bootstrap CSS. 

4. [innie.jpg](/static/images/innie.jpg)

        Jpg of innie belly button from Wikimedia Commons.

5. [outie.jpg](/static/images/outie.jpg)

        Jpg of outie belly button from Wikimedia Commons.

### **Website for this Repo**

- [https://billthedataguy.github.io/interactive-web-visualizations/](https://billthelibrarian.github.io/interactive-web-visualizations/)
