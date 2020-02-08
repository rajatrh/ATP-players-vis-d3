var whatKind = Object.keys(overallData)[0];


// get the data
fileName = "data/ATP/players_info.csv";
players = []
d3.csv(fileName).then(function (data) {
    // .slice(0, 10)
    data.forEach(p => {
        var play = new player(p);
        players.push(play);
    });

    getCurrentData(whatKind, players);
    modifyCharts(currentData);
    //createGraph(players, "aces");
});


var select = document.getElementById("menu1");
for (var key in overallData) {
    var li = document.createElement('li');
    li.innerHTML = '<a href="#">' + key + '</a>'
    select.appendChild(li);
}


var button1 = document.getElementById("dropdownMenu1");
button1.innerHTML = whatKind + " &nbsp; <span class=\"caret\"></span>"
var p1 = document.getElementById("barChartp1");
p1.innerHTML = "Distribution of tennis players by " + whatKind

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

var ul = document.getElementById('menu1');
ul.onclick = function (event) {
    var target = getEventTarget(event);
    button1.innerHTML = target.innerHTML + " &nbsp; <span class=\"caret\"></span>"
    whatKind = target.innerHTML;
    p1.innerHTML = "Distribution of tennis players by " + whatKind
    document.getElementById("cb1").checked = true;
    getCurrentData(whatKind, players);
    modifyCharts(currentData);
};

function checkBoxChanged(checkbox) {
    if (checkbox.checked == true) {
        getCurrentData(whatKind, players, true);
        modifyCharts(currentData);
    } else {
        getCurrentData(whatKind, players, false);
        modifyCharts(currentData);
    }
}