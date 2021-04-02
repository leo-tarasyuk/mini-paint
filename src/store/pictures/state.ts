import { Pictures } from "../../types";

export type PicturesState = {
  pictures: Array<Pictures>;
};

export const state: PicturesState = {
  pictures: []
};
