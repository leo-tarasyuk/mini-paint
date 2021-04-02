import { GetterTree } from "vuex";
import { State } from "../user/state";
import { PicturesState } from "./state";
import { Pictures } from "../../types";

type Getters = {
  getPictures(state: PicturesState): Array<Pictures>;
};

export const getters: GetterTree<PicturesState, State> & Getters = {
  getPictures: state => state.pictures
};
