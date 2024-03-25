const no_geo = d3.csv("no_geometry.csv");

no_geo.then(function(data) {
    // Define the dimensions for the chart
    let width = 800;
    let height = 800;

    // Define the margins for the chart
    let margin = { 
        top: 50, 
        right: 50, 
        bottom: 50, 
        left: 130 
    };

    // Specify the desired tick values for the y-axis
    let tickValues = [0, 200000, 400000, 600000, 800000];

    // Create the SVG container 
    let svg = d3.select("#scatterplot")
        .attr('width', width)
        .attr('height', height)
        .style('background', '#e9f7f2');

    // Create the scales
    let xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.imdb_score)])
        .range([margin.left, width - margin.right]);

    let yScale = d3.scaleLinear()
        .domain([0, 2500000])  // Extend the range to include up to 2,000,000
        .range([height - margin.bottom, margin.top]);

    //  Create the x-axis
    let xAxis = svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

    // Create the y-axis
    let yAxis = svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale));

    // Create the color scales
    let colorScaleScore = d3.scaleSequential(d3.interpolateViridis)
        .domain([0, d3.max(data, d => d.imdb_score)]);
    
    // Draw the circles
    svg.selectAll(".circle-score")
        .data(data)
        .enter().append("circle")
        .attr("class", "circle-score")
        .attr("cx", d => xScale(d.imdb_score))
        .attr("cy", d => yScale(d.imdb_votes))
        .attr("r", 5)
        .attr("fill", d => colorScaleScore(d.imdb_score))
        .attr("opacity", 0.7)
        .on("mouseover", function(event, d) {
            // Show the tooltip
            d3.select("#tooltip")
                .style("display", "block")
                .html("IMDB Score: " + d.imdb_score + "<br/>IMDB Votes: " + d.imdb_votes)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", function() {
            // Hide the tooltip
            d3.select("#tooltip")
                .style("display", "none");
        });
    

})