// JavaScript source code
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['User devices', 'Hours per Day'],
        ['Desktop', 50],
        ['Surfplatta', 20],
        ['Mobil', 30],
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {
        'title': 'Mobilfördelning',
        'width': 550,
        'height': 400,
        colors: ['#008f99', '#00becc', '#3cf3ff']
    };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
    chart.draw(data, options);
}
