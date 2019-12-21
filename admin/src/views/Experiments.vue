<template>
<d-container fluid class="main-content-container px-4">
    <d-row class="my-4">
        <d-col lg="8" md="6" sm="12" class="mb-4">
            <LineGraph title='L O L' v-bind:chartData="lineChartData"/>
        </d-col>
        <d-col lg="4" md="6" sm="12" class="mb-4">
            <!-- pay close attention to dataset format of PieChart, the data values are an array of objects-->
            <PieChart title='L O L !' v-bind:chartData="pieChartData" />
        </d-col>
        <d-col lg="8" md="6" sm="12" class="mb-4">
           <!-- <BarGraph title='L O L' /> -->
        </d-col>
    </d-row>
</d-container>
</template>

<script>
import LineGraph from '../components/senpai/LineGraph';
import BarGraph from '../components/senpai/BarGraph';
import PieChart from '../components/senpai/PieChart';

export default {
  name: 'Experiments',
  components: {
    LineGraph,
    PieChart,
    BarGraph,
  },
  data() {
    return {
      lineChartData: {
        labels: Array.from(new Array(30), (_, i) => i + 1),
        datasets: [{
          label: 'Current Month',
          data: [500, 800, 320, 180, 240, 320, 230, 650, 590, 1200, 750, 940, 1420, 1200, 960, 1450, 1820, 2800, 2102, 1920, 3920, 3202, 3140, 2800, 3200, 3200, 3400, 2910, 3100, 4250],
        }, {
          label: 'Past Month',
          data: [380, 430, 120, 230, 410, 740, 472, 219, 391, 229, 400, 203, 301, 380, 291, 620, 700, 300, 630, 402, 320, 380, 289, 410, 300, 530, 630, 720, 780, 1200],
        }, {
          label: 'Next Month',
          data: [410, 740, 472, 219, 391, 229, 400, 203, 301, 380, 291, 620, 700, 300, 630, 402, 320, 380, 289, 410, 300, 530, 630, 720, 780, 1200, 380, 430, 120, 230],
        }, {
          label: 'DIO Month',
          data: [380, 291, 620, 700, 300, 630, 402, 320, 380, 289, 410, 300, 530, 630, 720, 780, 1200, 380, 430, 120, 230, 410, 740, 472, 219, 391, 229, 400, 203, 301],
        }],
      },
      pieChartData: {
        datasets: [{
          data: [68.3, 24.2, 7.5, 69, 42, 91],
        }],
        labels: ['Desktop', 'Tablet', 'Mobile', 'Desktop', 'Tablet', 'Mobile'],
      },
    };
  },
};
</script>
