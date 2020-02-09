metaData = {
    "categorical": {
        "Nationality": { key: "nat", data: [], natData: [] },
        "Age": { key: "age", data: [], natData: [] },
        "Turned Pro": { key: "turned_pro", data: [], natData: [] }
    },
    "numerical": {
        "Nationality": { key: "nat", data: [], natData: [] },
        "Age": { key: "age", data: [], natData: [] },
        "Turned Pro": { key: "turned_pro", data: [], natData: [] }
    }
}

overallData = metaData['categorical'];
currentData = [];

function processData(viewWhat, players) {
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

function getCurrentData(viewWhat, players, sorted = true, sliceValue = 20) {
    if (overallData[viewWhat]['data'].length == 0) {
        processData(viewWhat, players);
    }
    if (sorted) {
        currentData = overallData[viewWhat]['data'].slice(0, sliceValue);
    } else {
        currentData = overallData[viewWhat]['natData'].slice(0, sliceValue);
    }
}
