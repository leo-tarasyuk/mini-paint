import { MutationTree } from "vuex";

import { MutationTypes } from "./mutation-types";
import { PicturesState } from "./types";
import { Pictures } from "../../types";

export type Mutations<S = PicturesState> = {
  [MutationTypes.showPictures](state: S, payload: Array<Pictures>): void;
};

export const mutations: MutationTree<PicturesState> & Mutations = {
  [MutationTypes.showPictures](state: PicturesState, payload: Array<Pictures>) {
    state.pictures = payload;
  }
};
