// function to recreate bar chart
function modifyCharts(players) {

    var margin = { top: 20, right: 20, bottom: 50, left: 50 };
    var width = parseInt(d3.select("#barChartContainer").style("width")) - margin.left - margin.right;
    var height = 380 - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingOuter(0.2)
        .paddingInner(0.1);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);
    document.getElementById("barChartContainer").innerHTML = "";

    svg = d3.select("#barChartContainer")
        .append("svg")
        .attr("class", "svg-bkg")
        .attr("width", "100%")
        .attr("height", "90%")

    g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tip = d3.select("#barChartContainer")
        .append("div")
        .attr("class", "tip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("z-index", "20");

    x.domain(players.map(function (d) { return d.key; }));
    y.domain([0, d3.max(players, function (d) { return d.value; })]);

    // x- axis
    g.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("x", "-5")
        .attr("y", "15")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

    g.append("text")
        .attr("y", height + 70)
        .attr("dx", width / 2 - margin.left)
        .attr("text-anchor", "start")
        .text(whatKind)

    //y-axis
    g.append("g")
        .call(d3.axisLeft(y).ticks(10))

    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -40)
        .attr("text-anchor", "end")
        .text("Count")

    //on hover
    g.selectAll(".bar")
        .data(players)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.key); })
        .attr("y", function (d) { return y(d.value); })
        .attr("width", x.bandwidth() - 5)
        .attr("height", function (d) { return height - y(d.value) })
        .on("mouseover", function (d) {

            // increase the width
            var xPos = +d3.select(this).attr("x")
            var wid = +d3.select(this).attr("width");
            d3.select(this).attr("x", xPos - 3).attr("width", wid + 6);

            // Create tip with HTML
            return tip.html(function () {
                return "<strong> " + d.key + "</strong> : <span style='color:orange'>" + d.value + "</span>";   //tip.text(d.value)
            }).style("visibility", "visible")
                .style("top", (y(d.value) - 11) + 'px')
                .style("left", x(d.key) + x.bandwidth() + 4 + 'px')
        })
        .on("mouseout", function () {
            // reset the width and postition
            d3.select(this).attr("x", function (d) {
                return x(d.key)
            })
                .attr("width", x.bandwidth() - 5);
            return tip.style("visibility", "hidden");
        });
}