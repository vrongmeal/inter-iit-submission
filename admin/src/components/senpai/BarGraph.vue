<template>
  <d-card class="card-small h-100">
    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
      <div class="block-handle"></div>
    </d-card-header>

    <d-card-body class="pt-0">
      <d-row class="border-bottom py-2 bg-light"></d-row>

      <!-- Legend & Chart -->
      <div ref="legend"></div>
      <canvas height="120" ref="canvas" style="max-width: 100% !important;"></canvas>
    </d-card-body>
  </d-card>
</template>

<script>
import Chart from '../../utils/chart';

export default {
  name: 'BarGraph',
  // extends: Bar,
  props: {
    title: {
      type: String,
      default: 'Users Overview',
    },
  },
  data() {
    console.log(this.loli);
  },
  mounted() {
    console.log(this.loli);
    // Overwriting base render method with actual data.
    const chartData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        },
      ],
    };
    new Chart(this.$refs.canvas, {
      type: 'bar',
      data: chartData,
      // options: options
    });
  },
};
</script>
