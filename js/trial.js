
//var data = [10, 30, 40, 50, 60]
d3.csv("data/weights.csv").then(function (data) {

    data.forEach(element => {
        element.weight = +element.weight
    });
    console.log(data);
    var svg = d3.select("#div_canvas").append("svg")
        .attr("width", 1200)
        .attr("height", 400)
    var circles = svg.selectAll("circle").data(data);

    circles.enter().append("circle").attr("cx", function (d, i) {
        console.log(d);
        return (i * 120) + 50;
    })
        .attr("cy", 200)
        .attr("r", function (d) {
            return d.weight / 2;
        })
        .attr("fill", "blue")
}).catch(function (error) {
    console.log(error);
});

var margin = { left: 100, right: 10, top: 10, bottom: 100 };
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var svg = d3.select("#div_bar_canvas").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.left + margin.right)

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.csv("data/ATP/players_info.csv").then(function (data) {
    var players = []
    mainData = data.slice(0, 10);
    mainData.forEach(p => {
        var play = new player(p);
        players.push(play);
    });
    
    // Scales

    var y = d3.scaleLinear().domain([0, d3.max(players, function (d) {
        return d.aces;
    })]).range([0, height])

    var x = d3.scaleBand().domain(players.map(d => {
        return d.name;
    })).range([0, width]).paddingInner(0.3).paddingOuter(0.1);

    // Ticks

    var xAxis = d3.axisBottom(x);
    g.append("g").attr("class", "x axis").attr("transform", "translate(0," + height+ ")")
        .call(xAxis)
        .selectAll("text")
            .attr("x", "-5")
            .attr("y", "15")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")
            

    var yAxis = d3.axisLeft(y);
    g.append("g").attr("class", "y axis")
        .call(yAxis)

    // Chart
    
    var bars = g.selectAll("rect").data(mainData);
    bars.enter().append("rect").attr("x", function (d, i) {
        return x(d.name);
    })
        .attr("y", 0)
        .attr("width", 15)
        .attr("height", function (d) {
            return y(d.aces);
        })
}).catch(function (error) {
    console.log(error);
});






