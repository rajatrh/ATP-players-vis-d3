// get the data
var margin = { top: 20, right: 20, bottom: 50, left: 50 };
var width = parseInt(d3.select("#barChartContainer").style("width")) - margin.left - margin.right;
var height = 380 - margin.top - margin.bottom;

fileName = "data/ATP/players_info.csv";
players = []
d3.csv(fileName).then(function (data) {
    data.forEach(p => {
        var play = new player(p);
        players.push(play);
    });

    getCurrentData(whatKind);
    modifyBarChart(currentData);
});

fileName2 = "data/ATP/atp_info.csv";
tournaments = []
d3.csv(fileName2).then(function (data) {
    data.forEach(t => {
        var tour = new tournament(t);
        tournaments.push(tour);
    });
});

// Capture tab Change
$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    metaDataKind = e.target.innerHTML;
    overallData = metaData[metaDataKind];
    whatKind = Object.keys(overallData)[0];
    initView();
    //e.target -> activated tab
    //e.relatedTarget -> previous tab
});

// Init View
function initView() {
    if (metaDataKind == 'Categorical') {
        // Populate dropdown menu for Categorical Data
        select.innerHTML = "";
        for (var key in overallData) {
            var li = document.createElement('li');
            li.innerHTML = '<a href="#">' + key + '</a>'
            select.appendChild(li);
        }

        // Init data
        button1.innerHTML = whatKind + " &nbsp; <span class=\"caret\"></span>"
        p1.innerHTML = "Distribution of tennis " + overallData[whatKind]['file'] + "s by " + whatKind;

        //initChart
        getCurrentData(whatKind);
        modifyBarChart(currentData);

    } else if (metaDataKind == 'Numerical') {
        // Populate dropdown menu for Numerical Data
        select2.innerHTML = "";
        for (var key in overallData) {
            var li = document.createElement('li');
            li.innerHTML = '<a href="#">' + key + '</a>'
            select2.appendChild(li);
        }

        button2.innerHTML = whatKind + " &nbsp; <span class=\"caret\"></span>"
        p2.innerHTML = "Distribution of tennis "+ overallData[whatKind]['file'] + "s by" + whatKind

        getCurrentData(whatKind);
        modifyHistogram(currentData, 15);
    }
}