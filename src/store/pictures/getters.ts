import { GetterTree } from "vuex";

import { PicturesState } from "./types";
import { RootState } from "./../types";
import { Pictures } from "../../types";

type Getters = {
  getPictures(state: PicturesState): Array<Pictures>;
};

export const getters: GetterTree<PicturesState, RootState> & Getters = {
  getPictures: state => state.pictures
};
