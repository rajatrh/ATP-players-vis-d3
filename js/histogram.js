var formatCount = d3.format(",.0f");
// Populate dropdown menu for Numerical Data
var select2 = document.getElementById("menu2");
// Init data
var button2 = document.getElementById("dropdownMenu2");
var p2 = document.getElementById("barChartp2");
var ul2 = document.getElementById('menu2');
// Slider event handled
var slider2 = document.getElementById("slider2");
var slider2Value = document.getElementById("slider2Value");

slider2Value.innerHTML = '15';
initView("Numerical");

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

// On click of dropdown menu
ul2.onclick = function (event) {
    var target = getEventTarget(event);
    button2.innerHTML = target.innerHTML + " &nbsp; <span class=\"caret\"></span>"
    whatKind = target.innerHTML;
    p2.innerHTML = "Distribution of tennis " + overallData[whatKind]['file'] + "s by " + whatKind
    document.getElementById("slider2").value = 15;
    slider2Value.innerHTML = '15';
    getCurrentData(whatKind);
    modifyHistogram(currentData, 15);
};

// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function () {
    slider2Value.innerHTML = this.value;
    getCurrentData(whatKind, true);
    modifyHistogram(currentData, this.value);
}

// function to recreate histogram
function modifyHistogram(values, noOfBins) {
    document.getElementById("histogramContainer").innerHTML = "";
    binWidth = 0;

    svg = d3.select("#histogramContainer")
        .append("svg")
        .attr("class", "svg-bkg")
        .attr("width", "100%")
        .attr("height", "90%")

    g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tip = d3.select("#histogramContainer")
        .append("div")
        .attr("class", "tip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("z-index", "20");

    var x = d3.scaleLinear()
        .domain(d3.extent(values))
        .rangeRound([0, width])

    var histogram = d3.histogram()
        .domain(x.domain())
        //.thresholds(x.ticks(noOfBins));
        .thresholds(d3.range(x.domain()[0],x.domain()[1],(x.domain()[1]-x.domain()[0])/noOfBins));
    
    var bins = histogram(values);
    
    binWidth = Math.round((bins[0].x1 - bins[0].x0) * 100) / 100
    var y = d3.scaleLinear()
        .domain([0, d3.max(bins, function (d) {
            return d.length;
        })])
        .rangeRound([height, 0]);

    //x- axis
    g.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(x).ticks(noOfBins))
        .selectAll("text")
        .attr("x", "5")
        .attr("y", "15")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

    g.append("text")
        .attr("y", height + 70)
        .attr("dx", width / 2 - margin.left)
        .attr("text-anchor", "start")
        .text(whatKind + " (Bin Width: " + binWidth + ")")

    //y-axis
    g.append("g")
        .call(d3.axisLeft(y).ticks(10))

    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -40)
        .attr("text-anchor", "end")
        .text("Count")
        

    //Transform before
    var bar = g.selectAll(".bar")
        .data(bins)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function (d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        }).on("mouseover", function (d) {

            // Create tip with HTML
            return tip.html(function () {
                return "<strong> " + (Math.round(d.x0 * 100) / 100)+  " - " + (Math.round(d.x1 * 100) / 100) + " </strong> : <span style='color:orange'> "+ d.length  +" </span>";   //tip.text(d.value)
            }).style("visibility", "visible")
                .style("top", (y(d.length) - 32) + 'px')
                .style("left", (x((d.x0 + d.x1)/2) - 30)+ 'px')  //x(d.x0 - ((d.x1 - d.x0) * 0.2))
        })
        .on("mouseout", function () {
            return tip.style("visibility", "hidden");
        });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", x(bins[0].x1) - x(bins[0].x0)-2)
        .attr("height", function (d) {
            return height - y(d.length);
        });


}