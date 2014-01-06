var History = {
    drawGraph: function drawGraph(label, element){
        var container = document.createElement('div');
        container.id = label + 'Container';
        container.classList.add('chartContainer');

        var chartDiv = document.createElement('div');
        chartDiv.id = label + 'Chart';
        chartDiv.classList.add('chart');

        container.appendChild(chartDiv);
        element.appendChild(container);

        var graph = new Dygraph(chartDiv, History.makeCSV(label), {
            title: label,//will need prettier titles eventually
            width: 560,
            stackedGraph: false,
            labelsSeparateLines: true,
        });
       
    },
    makeCSV: function makeCSV(args){
        //hardcoding the assumption that time is always the x axis
        var that = this;
        var headers = Array.prototype.slice.call(arguments);
        headers.unshift('Timestamp');
        var headersValid = headers.every(function(header){
            return !!that[header];
        });
        if (!headersValid){
            throw "Cannot generate CSV for nonexistent data stream.";
        };

        var lines = [headers.join(',')];
        for (var i = 0; i<this.Timestamp.length; i++){
            var data = [];
            for (var k = 0; k<headers.length; k++){
                data.push(this[headers[k]][i]);
            };
            lines.push(data.join(','));
        };
        return lines.join('\n');
    },
};

var getCSV = $.get('/api/history/', function processCSV(data){
    var lines = data.split(/\n+/).filter(function(x){
        return /^[-\w]/.test(x);//avoid blank lines, allow negative numbers
    });
    var headers = lines.shift();
    var labels = headers.split(/,/);
    labels.forEach(function(label){
        History[label] = [];
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
            History[label].push(item);
        };
    };

    var plots = document.getElementById('plots');
    for (var i = 1; i<labels.length; i++){
        //timestamp always included implicitly
        History.drawGraph(labels[i], plots);
    };
});

getCSV.fail(function(){
    $('#plots').text('Unable to retrieve data from server.');
});