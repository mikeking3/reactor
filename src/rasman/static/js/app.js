var allHistory = {};
var getCSV = $.get('/api/history/', function processCSV(data){
    var lines = data.split(/\n+/).filter(function(x){
        return /^\w/.test(x);//avoid blank lines
    });
    var headers = lines.shift();
    var labels = headers.split(/,/);
    labels.forEach(function(label){
        allHistory[label] = [];
    });
    for (var i = 0; i<lines.length; i++){
        var items = lines[i].split(/,/);
        if (items.length != labels.length){
            throw "malformed CSV file";
        };
        for (var k = 0; k<items.length; k++){
            var item = items[k];
            var label = labels[k];
            if (label !== 'Timestamp'){
                item = parseFloat(item);
            };
            allHistory[label].push(item);
        };
    };
    console.log(allHistory);
});
/*
function csvify_1stream(timestamp_array, data_array, labels_array) {
    var csvified;

    // += the elements from timestamp_array and data_array into csvified
    // csvified will not have any labels yet though
    for (var i = 0; i < timestamp_array.length; i++)
    {
        csvified += timestamp_array[i] + "," + data_array[i] + "\n";
    }
    var csvified_labels =  labels_array.toString();
    csvified_labels.append("\n");
    csvified.prepend(csvified_labels);
    return csvified;
}
*/
composite_graph = new Dygraph(document.getElementById("composite_chart"), "/api/history/", {
    title: 'Composite History',
    width: 560,
    stackedGraph: false,
    legend: 'always',
    labelsDiv: 'legenddiv',
    labelsSeparateLines: true,
    visibility: [true, true, true, true, true]
});

light_graph = new Dygraph(document.getElementById("light_chart"), "/api/history/", {
    title: 'Light History',
    width: 560,
    stackedGraph: false,
    legend: 'always',
  //  labelsDiv: 'legenddiv',
    labelsSeparateLines: true,
    visibility: [false, false, false, false, true]
});

co2_graph = new Dygraph(document.getElementById("co2_chart"), "/api/history/", {
    title: 'CO2 History',
    width: 560,
    stackedGraph: false,
    legend: 'always',
  //  labelsDiv: 'legenddiv',
    labelsSeparateLines: true,
    visibility: [false, true, false, false, false]
});

h2o_graph = new Dygraph(document.getElementById("h2o_chart"), "/api/history/", {
    title: 'H2O History',
    width: 560,
    stackedGraph: false,
    legend: 'always',
  //  labelsDiv: 'legenddiv',
    labelsSeparateLines: true,
    visibility: [false, false, true, false, false]
});

ph_graph = new Dygraph(document.getElementById("ph_chart"), "/api/history/", {
    title: 'pH History',
    width: 560,
    stackedGraph: false,
    legend: 'always',
  //  labelsDiv: 'legenddiv',
    labelsSeparateLines: true,
    visibility: [false, false, false, true, false]
});

temp_graph = new Dygraph(document.getElementById("temp_chart"), "/api/history/", {
    title: 'Temp History',
    width: 560,
    stackedGraph: false,
    legend: 'always',
  //  labelsDiv: 'legenddiv',
    labelsSeparateLines: true,
    visibility: [true, false, false, false, false]
});


