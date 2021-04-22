import { MutationTree } from "vuex";

import { MutationTypes } from "./mutation-types";
import { PicturesState } from "./types";
import { Pictures, UserParameters } from "../../types";

export type Mutations<S = PicturesState> = {
  [MutationTypes.showPictures](state: S, payload: Array<Pictures>): void;
  [MutationTypes.getUserParams](state: S, payload: UserParameters): void;
};

export const mutations: MutationTree<PicturesState> & Mutations = {
  [MutationTypes.showPictures](state: PicturesState, payload: Array<Pictures>) {
    state.pictures = payload;
  },
  [MutationTypes.getUserParams](state: PicturesState, payload: UserParameters) {
    state.user = payload;
  }
};
