// get the data
fileName = "data/ATP/players_info.csv";
players = []
d3.csv(fileName).then(function (data) {
    data.slice(0, 10).forEach(p => {
        var play = new player(p);
        players.push(play);
    });
    modifyCharts(players, "aces");
    createGraph(players, "aces");
});

var button1 = document.getElementById("dropdownMenu1");
button1.innerHTML = "Aces &nbsp; <span class=\"caret\"></span>"
var p1 = document.getElementById("barChartp1");
p1.innerHTML = "Aces - Top 10 players"

// IE does not know about the target attribute. It looks for srcElement
// This function will get the event target in a browser-compatible way
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

var ul = document.getElementById('menu1');
ul.onclick = function(event) {
    var target = getEventTarget(event);
    button1.innerHTML = target.innerHTML + " &nbsp; <span class=\"caret\"></span>"
    p1.innerHTML = target.innerHTML + " - Top 10 players"
    modifyCharts(players, target.innerHTML.toLowerCase());
};