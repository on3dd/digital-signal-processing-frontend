import MouseCoordinates from "../../../types/mouseCoordinates";
import {DetailsState} from "../../../types/details";

export default {
  state: new DetailsState({x: 0, y: 0}, 0),
  mutations: {
    updateCoordinates(state: DetailsState, coordinates: MouseCoordinates) {
      // console.log(coordinates);
      state.coordinates = coordinates
    },
    updateVisibility(state: DetailsState, isVisible: boolean) {
      state.isVisible = isVisible
    }
  },
  actions: {},
  getters: {
    coordinates: (state: DetailsState) => state.coordinates,
    isVisible: (state: DetailsState) => state.isVisible,
  }
}