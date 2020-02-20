metaData = {
    "Categorical": {
        "Nationality": { file: "player", key: "nat", data: [], natData: [] },
        "Age": { file: "player", key: "age", data: [], natData: [] },
        "Turned Pro": { file: "player", key: "turned_pro", data: [], natData: [] },
        "Location": { file: "tour", key: "location", data: [], natData: [] },
        "Tournament": { file: "tour", key: "tournament", data: [], natData: [] },
        "Series": { file: "tour", key: "series", data: [], natData: [] },
        "Court": { file: "tour", key: "court", data: [], natData: [] },
        "Surface": { file: "tour", key: "surface", data: [], natData: [] },
        "Round": { file: "tour", key: "round", data: [], natData: [] }
    },
    "Numerical": {
        "Weight": { file: "player", key: "weight", data: [], natData: [] },
        "Height": { file: "player", key: "height", data: [], natData: [] },
        "Aces": { file: "player", key: "aces", data: [], natData: [] },
        "Double Faults": { file: "player", key: "double_faults", data: [], natData: [] },
        "Winner Rank": { file: "tour", key: "wrank", data: [], natData: [] },
        "Loser Rank": { file: "tour", key: "lrank", data: [], natData: [] },
        "Winner Points": { file: "tour", key: "wpts", data: [], natData: [] },
        "Loser points": { file: "tour", key: "lpts", data: [], natData: [] }
    }
}

var metaDataKind = 'Categorical';
overallData = metaData['Categorical'];
currentData = [];

var whatKind = Object.keys(overallData)[0];

function processCategoricalData(viewWhat) {
    key = overallData[viewWhat]['key'];
    repMap = {};
    if (overallData[viewWhat]['file'] == 'player') {
        players.forEach(player => {
            if (player[key] != 0) {
                if (!(player[key] in repMap)) {
                    repMap[player[key]] = 1;
                } else {
                    repMap[player[key]] += 1;
                }
            }
        });
    } else {
        tournaments.forEach(tour => {
            if (tour[key] != 0) {
                if (!(tour[key] in repMap)) {
                    repMap[tour[key]] = 1;
                } else {
                    repMap[tour[key]] += 1;
                }
            }
        });
    }
    var sortable = [];
    for (var key in repMap) {
        sortable.push([key, repMap[key]]);
    }

    // unsorted Data
    repMap = []
    sortable.forEach(function (item) {
        repMap.push({ "key": item[0], "value": item[1] })

    })
    overallData[viewWhat]['natData'] = repMap;

    // sort it now
    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });

    repMap = []
    sortable.forEach(function (item) {
        repMap.push({ "key": item[0], "value": item[1] })
    })
    overallData[viewWhat]['data'] = repMap;
}

function processNumericalData(viewWhat) {
    key = overallData[viewWhat]['key'];
    values = [];
    if (overallData[viewWhat]['file'] == 'player') {
        players.forEach(player => {
            if (player[key] != 0) {
                values.push(player[key]);
            }
        });
    } else {
        tournaments.forEach(tour => {
            if (tour[key] != 0) {
                values.push(tour[key]);
            }
        });
    }
    
    values.sort(function (a, b) {
        return a - b;
    });
    overallData[viewWhat]['data'] = values;
}

function getCurrentData(viewWhat, sorted = true, sliceValue = 20) {
    if (metaDataKind == 'Categorical') {
        if (overallData[viewWhat]['data'].length == 0) {
            processCategoricalData(viewWhat);
        }
        if (sorted) {
            currentData = overallData[viewWhat]['data'].slice(0, sliceValue);
        } else {
            currentData = overallData[viewWhat]['natData'].slice(0, sliceValue);
        }
    } else if (metaDataKind == 'Numerical') {
        if (overallData[viewWhat]['data'].length == 0) {
            processNumericalData(viewWhat);
        }
        currentData = overallData[viewWhat]['data'];
    }
    //console.log(currentData);
}
