<template>
<div class="card card-small h-100">
    <div class="card-header border-bottom">
        <h6 class="m-0">{{ title }}</h6>
    </div>
    <div class="card-body d-flex py-0">
       <canvas height="220" ref="canvas" class="blog-users-by-device m-auto"></canvas>
    </div>
</div>
</template>

<script>
import Chart from '../../utils/chart';

const defaultChartData = {
  datasets: [{
    hoverBorderColor: '#ffffff',
    data: [68.3, 24.2, 7.5],
    backgroundColor: [
      'rgba(0,123,255,0.9)',
      'rgba(0,123,255,0.5)',
      'rgba(0,123,255,0.3)',
    ],
  }],
  labels: ['Desktop', 'Tablet', 'Mobile'],
};

export default {
  name: 'PieChart',
  props: {
    /**
       * The chart config.
       */
    chartConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
       * The chart options.
       */
    chartOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
       * The chart data.
       */
    chartData: {
      type: Object,
      default() {
        return defaultChartData;
      },
    },
    /**
       * The chart title.
       */
    title: {
      type: String,
      default: 'Users by device',
    },
  },
  mounted() {
    const chartConfig = {
      type: 'pie',
      data: this.chartData,
      options: {
        ...{
          legend: {
            position: 'bottom',
            labels: {
              padding: 25,
              boxWidth: 20,
            },
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: 'index',
            position: 'nearest',
          },
        },
        ...this.chartOptions,
      },
    };
    console.log(this.chartData.datasets[0].data);

    // fix chartData
    const hues = ['red', 'orange', 'green', 'blue', 'purple', 'pink'];
    const colors = this.$randomColor({
      count: this.chartData.datasets[0].data.length,
      format: 'rgb',
      hue: hues[Math.floor(Math.random() * hues.length)],
    });
    this.chartData.datasets[0].backgroundColor = colors;
    this.chartData.datasets[0].hoverBorderColor = '#ffffff';

    new Chart(this.$refs.canvas, chartConfig);
  },
};
</script>
