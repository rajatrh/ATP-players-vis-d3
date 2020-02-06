var margin = { top: 20, right: 20, bottom: 110, left: 50 };
var width = 500 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.05);
var y = d3.scaleLinear()
    .rangeRound([height, 0]);

// function to recreate bar chart
function modifyCharts(players, parameter) {

    document.getElementById("barChartContainer").innerHTML = "<svg width=\"500\" height=\"500\"></svg>";
    var svg = d3.select("svg").attr("class", "svg-bkg");
    g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var tip = d3.select("#barChartContainer")
        .append("div")
        .attr("class", "tip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("z-index", "20");

    x.domain(players.map(function (d) { return d.name; }));
    y.domain([0, d3.max(players, function (d) { return d[parameter]; })]);

    // x- axis
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("x", "-5")
        .attr("y", "15")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

    g.append("text")
        .attr("y", height + 60)
        .attr("dy", "2.5em")
        .attr("dx", width / 2 - margin.left)
        .attr("text-anchor", "start")
        .text("Players")

    console.log('WOWOWA')
    //y-axis
    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(parameter);

    //on hover
    g.selectAll(".bar")
        .data(players)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.name); })
        .attr("y", function (d) { return y(d[parameter]); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d[parameter]) })
        .on("mouseover", function (d) {
            return tip.text(d[parameter])
                .style("visibility", "visible")
                .style("top", y(d[parameter]) - 13 + 'px')
                .style("left", x(d.name) + x.bandwidth() - 12 + 'px')
        })
        .on("mouseout", function () {
            return tip.style("visibility", "hidden");
        });
}