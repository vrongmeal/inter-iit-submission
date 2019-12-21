<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <!-- <span class="text-uppercase page-subtitle">Overview</span> -->
        <h3 class="page-title">Track Your Issue</h3>
      </div>
    </div>

    <div class="issues-table" v-if="issuesVisible">
    <!-- Default Dark Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4">
          <div class="card-header bg-dark">
            <h6 class="m-0 text-white">Open Issues</h6>
          </div>
          <div class="card-body p-0 pb-3 bg-dark text-center">
            <table class="table table-dark mb-0">
              <thead class="thead-dark">
                <tr>
                  <th scope="col" class="border-bottom-0">ID</th>
                  <th scope="col" class="border-bottom-0">Title</th>
                  <th scope="col" class="border-bottom-0">Level</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="issue in issues" :key="issue.id" @click="showTracking(issue.id)">
                  <td>{{ issue.id }}</td>
                  <td>{{ issue.title }}</td>
                  <td>{{ issue.level }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>

    <div class="tracker" v-if="trackerVisible">
      <!-- <d-row> -->
        <d-card>
        <d-card-body>
          <h5 class="page-title">{{ issueHead }}</h5>
          <div v-for="index in [4,3,2,1,0]" :key="index" class="orderstatus" :class="{ 'done' : index<=level }">
            <div class="orderstatus-check"><span class="orderstatus-number">{{ index }}</span></div>
            <div class="orderstatus-text">
              <time>{{ levelDates[index] }}</time>
              <p>Your order is delivered</p>
            </div>
          </div>
          <br>
          <d-col>
            <d-card>
              <d-card-body subtitle="Issue filed on">
                {{ issueTime }}
              </d-card-body>
              <d-card-body subtitle="Description">
                {{ issueDes }}
              </d-card-body>
            </d-card>
            <d-card-img :src="image" bottom />
          </d-col>
        </d-card-body>
      </d-card>
      <!-- </d-row> -->
    </div>
  </div>
</template>

<style>
  .orderstatus {
    color: #939393;
    display: block;
    padding: 1em 0;
    position: relative;
    text-align: center;
    min-height: 150px;
  }

  .orderstatus.done:before {
    background: #32841f;
    
  }
  .orderstatus:before {
    content: '';
    height: 100%;
    position: absolute;
    left: 50%;
    width: 2px;
    background: #939393;
    margin: 0 25px;
  }

  .orderstatus:last-child:before {
    height: 0;
  }

  .orderstatus.done {
    color: #333;
  }

  @media only screen and (max-width: 40em) {
    .orderstatus {
      text-align: left;
    }
    .orderstatus:before {
      left: 0;
    }
    .orderstatus .orderstatus-text {
      left: 0;
      width: 100%;
    }
  }

  .orderstatus-text {
    position: relative;
    width: 50%;
    left: 50%;
    text-align: left;
    padding-left: 60px;
  }

  @media only screen and (min-width: 40em) {
    .orderstatus:nth-child(2n) .orderstatus-text {
      left: 10px;
      text-align: right;
      padding-right: 20px;
    }
  }

  .orderstatus-container {
    padding: 2em 0;
  }

  .orderstatus time {
    display: block;
    font-size: 1em;
    color: #939393;
  }

  .orderstatus.done time {
    color: #368d22;
  }

  @media only screen and (max-width: 40em) {
    .orderstatus-container {
      text-align: center;
    }
  }

  .orderstatus-check {
    font-family: "Helvetica", Arial, sans-serif;
    border: 2px solid #939393;
    width: 50px;
    height: 50px;
    display: inline-block;
    text-align: center;
    line-height: 48px;
    border-radius: 50%;
    margin-bottom: 0.5em;
    background: #fff;
    z-index: 2;
    position: absolute;
    color: #939393;
    left: 50%;
  }

  .done .orderstatus-check {
    color: #368d22;
    border-color: #368d22;
  }

  @media only screen and (max-width: 40em) {
    .orderstatus-check {
      left: 0;
    }
  }

  .orderstatus-active {
    text-align: center;
    position: relative;
    left: 25px;
    top: 20px;
    color: #939393;
  }

  @media only screen and (max-width: 40em) {
    .orderstatus-active {
      display: none;
    }
  }
</style>

<script>
export default {
  data() {
    return {
      issuesVisible: true,
      trackerVisible: false,
      issues: [
        {
          id: 0,
          timestamp: 1284101487,
          image: '5.png',
          location: [1, 2, 4],
          title: 'Walking on the moon in Bangalore',
          description: 'This time on roller coaster',
          level: 0,
          user: 0,
        },
        {
          id: 0,
          timestamp: 1284101487,
          image: '5.png',
          location: [1, 2, 4],
          title: 'Walking on the moon in Bangalore',
          description: 'This time on roller coaster',
          level: 0,
          user: 0,
        },
        {
          id: 0,
          timestamp: 1284101487,
          image: '5.png',
          location: [1, 2, 4],
          title: 'Walking on the moon in Bangalore',
          description: 'This time on roller coaster',
          level: 0,
          user: 0,
        },
        {
          id: 0,
          timestamp: 1284101487,
          image: '5.png',
          location: [1, 2, 4],
          title: 'Walking on the moon in Bangalore',
          description: 'This time on roller coaster',
          level: 0,
          user: 0,
        },
      ],
      levels: [0, 1, 2],
      levelDates: ['17 Jan', '17 Aug', '17 Dec'],
      currentIssueID: 0,
    };
  },
  methods: {
    showTracking(id) {
      // eslint-disable-next-line no-alert
      this.issuesVisible = false;
      this.trackerVisible = true;
      this.currentIssueID = id;
    },
  },
};
</script>
