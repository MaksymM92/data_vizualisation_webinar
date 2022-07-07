const ctx = document.getElementById('chartjs-line-chart').getContext('2d');

const dataSetConfiguration = {
  labels: ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
  datasets: [{
    label: 'Dataset',
    data: [65, 59, 80, 81],
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
  }]
};

const myChart = new Chart(ctx, {
  type: 'line',
  data: dataSetConfiguration,
});
