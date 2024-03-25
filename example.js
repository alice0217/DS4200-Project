//Define data
const crime = d3.csv("us_statewide_crime.csv");

crime.then(function(data) {
  // Convert string values to numbers
  data.forEach(function(d) {
      d.Unemployed = +d.Unemployed;
  });
  data.sort((a, b) => b.Unemployed - a.Unemployed);

  // Code in here
  let width = 800,
    height = 1000;
  let margin = {
    top: 30,
    bottom: 30,
    left: 100,
    right: 30,
  };

  // Create the SVG container
  let svg = d3
    .select("#plot")
    .attr("width", width)
    .attr("height", height);

  // Set up scales for x and y axes
  const min = 0;
  const max = d3.max(data, (d) => d.Unemployed);
  let xScale = d3
    .scaleLinear()
    .domain([
      min,
      max,
    ])
    .range([margin.left, width - margin.right]);

  let yScale = d3 
    .scaleBand()
    .domain(data.map((d) => d.State))
    .range([margin.top, height - margin.bottom])
    .padding(0.2);

  // Add scales
  let xAxis = svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom().scale(xScale));

  let yAxis = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft().scale(yScale));

  // Add bars for each data point
  let bars = svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", xScale(min))
    .attr("y", (d) => yScale(d.State))
    .attr("width", (d) => xScale(d.Unemployed) - xScale(min))
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue")
    .attr("cursor", "pointer");

  // Click on bars and change color
  bars.on("click", function(d) {
    if (d3.select(this).attr("fill") === "steelblue") {
      d3.select(this).transition().delay(100).attr("fill", "red");
    } else {
      d3.select(this).transition().delay(100).attr("fill", "steelblue");
    }
  });

  // Add labels for each data point
  let labels = svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text((d) => d.Unemployed)
    .attr("x", (d) => xScale(d.Unemployed))
    .attr("y", (d) => yScale(d.State) + yScale.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", 5)
    .attr("text-anchor", "start")
    .attr("fill", "white");

  // Add x-axis label 
  xAxis
    .append("text")
    .text("Unemployment rate")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("fill", "black");
});



