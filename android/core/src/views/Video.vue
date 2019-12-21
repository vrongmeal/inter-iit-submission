<template>
<div class="video-div">
    <div class="video-camera-div">
    <video
      autoPlay
      muted
      width="720"
      height="600"
      ref="vid"
      class="video-camera"
    />
    <canvas ref="can" height="600" width="720" class="video-camera" />
    <canvas ref="c" height="600" width="720" style="height:1px;width:1px" />
  </div>

  <div class="camera-button" @click="captureClick">
  </div>

</div>
</template>

<script>
export default {
  name: 'Video',
  data() {
    return {
      capture: new Image(),
    }
  },
  methods: {
    captureClick(e) {
      e.preventDefault();
      let canvas = this.$refs.c;
      console.log(canvas);
      canvas.getContext('2d').drawImage(this.$refs.vid, 0, 0, 720, 600);
      this.capture = new Image();
      this.capture.id = 'image-capture';
      this.capture.src = canvas.toDataURL('image/png');
      var base64data = this.capture.src.replace("data:image/png;base64,","");
      var bs = atob(base64data);
      var buffer = new ArrayBuffer(bs.length);
      var ba = new Uint8Array(buffer);
      for (var i = 0; i < bs.length; i++) {
        ba[i] = bs.charCodeAt(i);
      }
      var blob = new Blob([ba],{type:"image/png"});
      this.$store.commit('updateImg', blob);
      this.$router.push('/submit-issue');
    },
    detectFromVideoFrame(model, video) {
      model.detect(video).then(predictions => {
        this.showDetections(predictions);

        requestAnimationFrame(() => {
          this.detectFromVideoFrame(model, video);
        });
      }, (error) => {
        console.log("Couldn't start the webcam")
        console.error(error)
      });
    },
    showDetections(predictions) {
      const ctx = this.$refs.can.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const font = "24px helvetica";
      ctx.font = font;
      ctx.textBaseline = "top";

      predictions.forEach(prediction => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];
        // Draw the bounding box.
        ctx.strokeStyle = "#2fff00";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
        // Draw the label background.
        ctx.fillStyle = "#2fff00";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10);
        // draw top left rectangle
        ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
        // draw bottom left rectangle
        ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

        // Draw the text last to ensure it's on top.
        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);
        ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
      });
    },
  },
  mounted() {
    if (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia) {
      // define a Promise that'll be used to load the webcam and read its frames
      const webcamPromise = navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "environment"
          },
          audio: false,
        })
        .then(stream => {
          // pass the current frame to the window.stream
          window.stream = stream;
          // pass the stream to the $refs.vid
          this.$refs.vid.srcObject = stream;

          return new Promise(resolve => {
            this.$refs.vid.onloadedmetadata = () => {
              resolve();
            };
          });
        }, (error) => {
          console.log("Couldn't start the webcam")
          console.error(error)
        });

      // define a Promise that'll be used to load the model
      const loadlModelPromise = cocoSsd.load();

      // resolve all the Promises
      Promise.all([loadlModelPromise, webcamPromise])
        .then(values => {
          this.detectFromVideoFrame(values[0], this.$refs.vid);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
};
</script>
