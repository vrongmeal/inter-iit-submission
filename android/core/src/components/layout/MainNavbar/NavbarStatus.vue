<template>
    <div style="display:flex; flex-direction:row; margin-top:1rem; margin-left:1rem;" class="w-100 d-none d-md-flex d-lg-flex">
        <h6>Coins</h6>
        <h6 class="material-icons ml-3 mr-1">sports_volleyball</h6>
        <h6 class="text-blue">{{ coins }}</h6>
    </div>
</template>

<script>
export default {
  data() {
    return {
      coins: this.$store.state.coins,
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      this.coins = this.$store.state.coins;
    });
  },
};
</script>
