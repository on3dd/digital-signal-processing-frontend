import MouseCoordinates from "../../../types/mouseCoordinates";
import {DetailsState} from "../../../types/details";

export default {
  state: new DetailsState(0, {x: 0, y: 0}),
  mutations: {
    updateIdx(state: DetailsState, idx: number) {
      state.idx = idx
    },
    updateCoordinates(state: DetailsState, coordinates: MouseCoordinates) {
      state.coordinates = coordinates
    },
    updateVisibility(state: DetailsState, isVisible: boolean) {
      state.isVisible = isVisible
    }
  },
  actions: {},
  getters: {
    idx: (state: DetailsState) => state.idx,
    coordinates: (state: DetailsState) => state.coordinates,
    isVisible: (state: DetailsState) => state.isVisible,
  }
}