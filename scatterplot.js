const no_geo = d3.csv("no_geometry.csv");

no_geo.then(function(data) {
    // Define the dimensions for the chart
    let width = 600;
    let height = window.innerHeight - 100;

    // Define the margins for the chart
    let margin = { 
        top: 50, 
        right: 50, 
        bottom: 50, 
        left: 130 
    };

    // Create the SVG container 
    let svg = d3.select("#scatterplot")
        .attr('width', width)
        .attr('height', height);

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

    // Add labels
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - 5)
        .attr('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text('IMDB Score');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', 50)
        .attr('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text('IMDB Votes');

    // Create the color scales
    //let colorScaleScore = d3.scaleSequential(d3.interpolateViridis)
        //.domain([0, d3.max(data, d => d.imdb_score)]);
    
    // Draw the circles
    svg.selectAll(".circle-score")
        .data(data)
        .enter().append("circle")
        .attr("class", "circle-score")
        .attr("cx", d => xScale(d.imdb_score))
        .attr("cy", d => yScale(d.imdb_votes))
        .attr("r", 5)
        .attr("fill", "#c83c44")
        .attr("opacity", 0.7)

})