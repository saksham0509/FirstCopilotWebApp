// Get the table element
var table = document.querySelector('.table');

// Get all the select elements
var selects = table.querySelectorAll('select');

// Select the "CHART" tab
var chartTab = document.querySelector('a[data-toggle="tab"][href="#menu1"]');

// Get the download button
var downloadButton = document.querySelector('.btn.btn-primary');

// Add an event listener to the download button
downloadButton.addEventListener('click', function() {
    // Get the canvas
    var canvas = document.getElementById('myChart');

    // Convert the canvas content to an image (in PNG format)
    var image = canvas.toDataURL('image/png');

    // Create a link element
    var link = document.createElement('a');

    // Set the href of the link to the image
    link.href = image;

    // Set the download attribute of the link
    link.download = 'chart.png';

    // Append the link to the body
    document.body.appendChild(link);

    // Simulate a click on the link
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
});

// Add an event listener to each select element
chartTab.addEventListener('click', function () {
    console.log('chart tab clicked');
    // Destroy the old chart if it exists
    if (myChart) {
        myChart.destroy();
    }

    // Get the labels from the table headers
    var labels = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);

    // Remove the first label ("Team Member")
    labels.shift();

    var colors = 'rgba(255, 99, 132, 0.5)';
    var borderColors = 'rgba(255, 99, 132, 1)';

    // Get the data from the table rows
    var data = Array.from(table.querySelectorAll('tbody tr')).map(tr => {
        // Get the cells in this row
        var cells = tr.querySelectorAll('td');

        // Get the team member name
        var teamMember = cells[0].textContent;

        // Get the ratings
        var ratings = Array.from(cells).slice(1).map(td => {
            // Get the selected rating
            var rating = td.querySelector('select').value;

            // Convert the rating to a number
            switch (rating) {
                case 'Not Good': return 1;
                case 'Average': return 2;
                case 'As Expected': return 3;
                case 'More Than Expected': return 4;
                case 'Exceptional': return 5;
                default: return 0;
            }
        });

        // Return the data for this team member
        return {
            label: teamMember,
            data: ratings,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        };
    });

    // Create the chart
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: data
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5
                }
            },
            
        }
    });

    // Update the chart
    myChart.data.labels = labels;
    myChart.data.datasets = data;
    myChart.update();

});