import MouseCoordinates from "./mouseCoordinates";

export class DetailsState {
  coordinates: MouseCoordinates;
  idx: number;
  isVisible: boolean;

  constructor(coordinates: MouseCoordinates, idx: number) {
    this.coordinates = coordinates;
    this.idx = idx;
    this.isVisible = false;
  }
}