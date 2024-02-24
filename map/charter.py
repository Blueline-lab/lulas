#html content for charts

html = """
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <link rel="stylesheet" href="/static/universal.css" />
  </head>
  <body>
    <canvas id="chart" width="800" height="450"></canvas>
    <script>
        new Chart(document.getElementById("chart"), {
            type: 'line',
            data: {
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                        data: [2478,5267,734,784,433]
                    }
                ]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }
            }
        });
    </script>
  </body>
</html>

    """