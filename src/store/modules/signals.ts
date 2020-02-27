import { Signal, SignalsState } from "../../../types/signals";

const testData: Signal[] = [
  {val: 1.0},
  {val: 5.0},
  {val: 3.0},
  {val: 11.0},
  {val: 0.0},
  {val: 4.0},
  {val: 15.0},
  {val: 7.0},
  {val: 10.0},
  {val: 6.0},
  {val: 4.0},
  {val: 9.0},
  {val: 13.0},
  {val: 10.0},
  {val: 3.0},
];

export default {
  // @ts-ignore
  state: SignalsState,
  mutations: {
    updateSignals(state: SignalsState, signals: Signal[]) {
      state.signals = signals
    }
  },
  actions: {
    async fetchSignals({commit}: any) {
      const data = await new Promise(resolve => setTimeout(() => {
        resolve(testData)
      }, 0));

      commit('updateSignals', data)
    }
  },
  getters: {
    signals: (state: SignalsState) => state.signals,
    signalValByIdx: (state: SignalsState) => (idx: number) => state.signals[idx].val
  }
}