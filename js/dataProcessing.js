metaData = {
    "Categorical": {
        "Nationality": { key: "nat", data: [], natData: [] },
        "Age": { key: "age", data: [], natData: [] },
        "Turned Pro": { key: "turned_pro", data: [], natData: [] }
    },
    "Numerical": {
        "Weight": { key: "weight", data: [], natData: [] },
        "Height": { key: "height", data: [], natData: [] },
        "Aces": { key: "aces", data: [], natData: [] },
        "Double Faults": { key: "double_faults", data: [], natData: [] }
    }
}

var metaDataKind = 'Categorical';
overallData = metaData['Categorical'];
currentData = [];

var whatKind = Object.keys(overallData)[0];

function processCategoricalData(viewWhat, players) {
    key = overallData[viewWhat]['key'];
    repMap = {};
    players.forEach(player => {
        if (player[key] != 0) {
            if (!(player[key] in repMap)) {
                repMap[player[key]] = 1;
            } else {
                repMap[player[key]] += 1;
            }
        }
    });

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

function processNumericalData(viewWhat, players) {
    key = overallData[viewWhat]['key'];
    values = [];
    players.forEach(player => {
        if (player[key] != 0) {
            values.push(player[key]);
        }
    });

    values.sort(function (a, b) {
        return a - b;
    });
    overallData[viewWhat]['data'] = values;
}

function getCurrentData(viewWhat, players, sorted = true, sliceValue = 20) {
    if (metaDataKind == 'Categorical') {
        if (overallData[viewWhat]['data'].length == 0) {
            processCategoricalData(viewWhat, players);
        }
        if (sorted) {
            currentData = overallData[viewWhat]['data'].slice(0, sliceValue);
        } else {
            currentData = overallData[viewWhat]['natData'].slice(0, sliceValue);
        }
    } else if (metaDataKind == 'Numerical') {
        if (overallData[viewWhat]['data'].length == 0) {
            processNumericalData(viewWhat, players);
        }
        currentData = overallData[viewWhat]['data'];
    }
    //console.log(currentData);
}
