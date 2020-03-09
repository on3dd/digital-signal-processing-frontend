import Vue from 'vue'
import Vuex from 'vuex'

import file from "@/store/modules/file";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    file,
  },
})
