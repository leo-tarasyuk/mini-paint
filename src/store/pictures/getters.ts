import { GetterTree } from "vuex";

import { PicturesState } from "./types";
import { RootState } from "./../types";
import { Pictures, UserParameters } from "../../types";

type Getters = {
  getPictures(state: PicturesState): Array<Pictures>;
  getUserProperty(state: PicturesState): UserParameters | null;
};

export const getters: GetterTree<PicturesState, RootState> & Getters = {
  getPictures: state => state.pictures,
  getUserProperty: state => state.user
};
