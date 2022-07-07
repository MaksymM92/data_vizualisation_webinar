const myChart = echarts.init(document.getElementById('echart-bar-chart'), null, {
  width: 1200,
  height: 500
});

const option = {
  xAxis: {
    data: ['Value 1', 'Value 2', 'value 3', 'Value 4', 'Value 5', 'Value 6', 'Value 7']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [150, 230, 224, 218, 135, 147, 260]
    }
  ]
};

myChart.setOption(option);
