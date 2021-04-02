import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "./state";
import { Pictures } from "../../types";

export type Mutations<S = State> = {
  [MutationTypes.registerUser](state: S, payload: string | undefined): void;
  [MutationTypes.loginUser](state: S, payload: string | undefined): void;
  [MutationTypes.showPictures](state: S, payload: Array<Pictures>): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.registerUser](state: State, payload: string) {
    state.user = payload;
  },

  [MutationTypes.loginUser](state: State, payload: string) {
    state.user = payload;
  },

  [MutationTypes.showPictures](state: State, payload: Array<Pictures>) {
    state.pictures = payload;
  }
};
