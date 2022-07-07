import data from '../data/pieData.js'

const myChart = echarts.init(document.getElementById('echart-chart'), null, {
  width: 550,
  height: 550
});

const option = {
  series: [
    {
      type: 'pie',
      data: data,
      radius: '50%'
    }
  ]
};

myChart.setOption(option);
