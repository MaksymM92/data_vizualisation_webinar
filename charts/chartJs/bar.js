const ctx = document.getElementById('chartjs-bar-chart').getContext('2d');

const dataSetConfiguration = {
  labels: ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
  datasets: [{
    label: 'Bar chart',
    data: [65, 59, 80, 81],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

const myChart = new Chart(ctx, {
  type: 'bar',
  data: dataSetConfiguration,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
});
