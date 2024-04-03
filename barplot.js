//Define data
const netflix = d3.csv("no_geometry.csv");

netflix.then(function (data) {
  let map = new Map();
  data.forEach(function (d) {
    let country = d.Country;
    if (!map.has(country)) {
      map.set(country, [0, 0]);
    }
    let show = map.get(country)[0] + (d.type == "SHOW" ? 1 : 0);
    let movie = map.get(country)[1] + (d.type == "MOVIE" ? 1 : 0);
    let arr = [show, movie];
    map.set(country, arr);
  });

  map.forEach(function (value, key) {
    let total = value[0] + value[1];
    let show = (value[0] / total) * 100;
    let movie = (value[1] / total) * 100;
    let arr = [show, movie];
    map.set(key, arr);
  });

  let width = 1200,
    height = 3000;
  let margin = {
    top: 0,
    bottom: 0,
    left: 160,
    right: 0,
  };

  let svg = d3.select("#barplot").attr("width", width).attr("height", height);

  let xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin.left, width - margin.right]);

  let yScale = d3
    .scaleBand()
    .domain(Array.from(map.keys()))
    .range([margin.top, height - margin.bottom])
    .padding(0.2);

  let yAxis = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft().scale(yScale).tickSize(0))
    .select(".domain")
    .remove();

  svg
    .selectAll("rect")
    .data(Array.from(map.keys()))
    .enter()
    .append("rect")
    .attr("x", xScale(0))
    .attr("y", (d) => yScale(d))
    .attr("width", (d) => xScale(map.get(d)[0]) - xScale(0))
    .attr("height", yScale.bandwidth())
    .attr("fill", "#c83c44");

  svg
    .selectAll(".show-percentage")
    .data(Array.from(map.keys()))
    .enter()
    .append("text")
    .attr("class", "show-percentage")
    .attr("x", xScale(0.5))
    .attr("y", (d) => yScale(d) + yScale.bandwidth() / 2)
    .text((d) => `${map.get(d)[0].toFixed(1)}%`)
    .attr("dy", "0.35em")
    .attr("font-size", "12px")
    .attr("fill", "white")
    .attr("font-family", "Arial")
    .attr("text-anchor", "start");

  svg
    .selectAll(".red-bar")
    .data(Array.from(map.keys()))
    .enter()
    .append("rect")
    .attr("class", "red-bar")
    .attr("x", (d) => xScale(map.get(d)[0]))
    .attr("y", (d) => yScale(d))
    .attr("width", (d) => xScale(map.get(d)[1]) - xScale(0))
    .attr("height", yScale.bandwidth())
    .attr("fill", "#504c4c");

  svg
    .selectAll(".movie-percentage")
    .data(Array.from(map.keys()))
    .enter()
    .append("text")
    .attr("class", "movie-percentage")
    .attr("x", xScale(99.5)) 
    .attr("y", (d) => yScale(d) + yScale.bandwidth() / 2)
    .text((d) => `${map.get(d)[1].toFixed(1)}%`)
    .attr("dy", "0.35em")
    .attr("font-size", "12px")
    .attr("fill", "white")
    .attr("font-family", "Arial")
    .attr("text-anchor", "end");
});
