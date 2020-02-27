import MouseCoordinates from "./mouseCoordinates";

export class DetailsState {
  idx: number;
  coordinates: MouseCoordinates;
  isVisible: boolean;

  constructor(idx: number, coordinates: MouseCoordinates, ) {
    this.idx = idx;
    this.coordinates = coordinates;
    this.isVisible = false;
  }
}