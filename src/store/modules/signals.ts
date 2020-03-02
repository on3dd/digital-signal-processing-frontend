import { Signal, SignalsState } from "../../../types/signals";

const testData: Signal[] = [
  {val: 132.0},
  {val: 543.0},
  {val: 343.0},
  {val: 121.0},
  {val: 12.0},
  {val: 432.0},
  {val: 115.0},
  {val: 742.0},
  {val: 120.0},
  {val: 336.0},
  {val: 1342.0},
  {val: 231.0},
  {val: 123.0},
  {val: 130.0},
  {val: 321.0},
  {val: 131.0},
  {val: 345.0},
  {val: 663.0},
  {val: 883.0},
  {val: 1123.0},
  {val: 1593.0},
  {val: 213.0},
  {val: 543.0},
  {val: 863.0},
  {val: 323.0},
  {val: 1243.0},
  {val: 923.0},
  {val: 2143.0},
  {val: 743.0},
  {val: 1002.0},
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
    signalValByIdx: (state: SignalsState) => (idx: number) => {
      // console.log("Index:", idx);
      // console.log("Signals:", state.signals);
      return state.signals[idx].val
    }
  }
}