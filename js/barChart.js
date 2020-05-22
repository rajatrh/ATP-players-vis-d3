var checkBoxed = true;
var select = document.getElementById("menu1");
var button1 = document.getElementById("dropdownMenu1");
var p1 = document.getElementById("barChartp1");
var ul = document.getElementById('menu1');
// Slider event handled
var slider = document.getElementById("slider1");
var slider1Value = document.getElementById("slider1Value");

slider1Value.innerHTML = '20';
initView("Categorical");

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}


// On click of dropdown menu
ul.onclick = function (event) {
    var target = getEventTarget(event);
    button1.innerHTML = target.innerHTML + " &nbsp; <span class=\"caret\"></span>"
    whatKind = target.innerHTML;
    p1.innerHTML = "Distribution of tennis " + overallData[whatKind]['file'] + "s by " + whatKind
    document.getElementById("cb1").checked = true;
    checkBoxed = true;
    document.getElementById("slider1").value = 20;
    slider1Value.innerHTML = '20';
    getCurrentData(whatKind);
    modifyBarChart(currentData);
};

// Checkbox event handled
function checkBoxChanged(checkbox) {
    checkBoxed = checkbox.checked;
    if (checkBoxed == true) {
        getCurrentData(whatKind, true);
        modifyBarChart(currentData);
    } else {
        getCurrentData(whatKind, false);
        modifyBarChart(currentData);
    }
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    getCurrentData(whatKind, checkBoxed, this.value);
    slider1Value.innerHTML = this.value;
    modifyBarChart(currentData);
}

// function to recreate bar chart
function modifyBarChart(players) {
    // console.log(width)
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

    // This is the xaxis
    g.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("x", "-5")
        .attr("y", "15")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

    // Label for x axis
    g.append("text")
        .attr("y", height + 70)
        .attr("dx", width / 2 - margin.left)
        .attr("text-anchor", "start")
        .text(whatKind)

    //Y axis
    g.append("g")
        .call(d3.axisLeft(y).ticks(10))

    // Label for y axis
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
            var xPos = +d3.select(this).attr("x");
            var yPos = +d3.select(this).attr("y");
            //console.log(yPos)
            var wid = +d3.select(this).attr("width");
            var hei = +d3.select(this).attr("height");
            d3.select(this).attr("x", xPos - 3).attr("width", wid + 6);
            d3.select(this).attr("height", hei + 5)
            d3.select(this).attr("y", yPos - 5)

            // Create tip with HTML
            return tip.html(function () {
                return "<span style='font-weight: bold !important'> <b>" + d.key +
                    "</b></span> : <span style='color:black'>" + d.value + "</span>";
            }).style("visibility", "visible")
                .style("top", (y(d.value) - 32) + 'px')
                .style("left", x(d.key) - 5 + 'px')
        })
        .on("mouseout", function () {
            // reset the width and postition
            var hei = +d3.select(this).attr("height");
            var yPos = +d3.select(this).attr("y");
            d3.select(this).attr("x", function (d) {
                return x(d.key)
            })
                .attr("width", x.bandwidth() - 5)
                .attr("height", hei - 5)
                .attr("y", yPos + 5);
            return tip.style("visibility", "hidden");
        });
}