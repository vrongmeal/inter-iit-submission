/* eslint-disable indent */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coins: 1000,
    broke: false,
    img: new Blob(),
  },
  getters: {
    coins: state => state.coins,
    img: state => state.img,
  },
  mutations: {
    purchaseItems(state, cost) {
      // eslint-disable-next-line no-param-reassign
      if (state.coins - cost < 0)
        broke = true;
      else
        state.coins -= cost;
    },
    cancelItems(state, cost) {
        // eslint-disable-next-line no-param-reassign
        state.coins += cost;
    },
    updateImg(state, img) {
      state.img = img;
    },
  },
});
