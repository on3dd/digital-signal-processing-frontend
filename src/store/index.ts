import Vue from 'vue'
import Vuex from 'vuex'

import signals from "@/store/modules/signals"
import details from "@/store/modules/details";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    signals,
    details
  }
})
