import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationTypes.registerUser](state: S, payload: string | undefined): void;
  [MutationTypes.loginUser](state: S, payload: string | undefined): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.registerUser](state: State, payload: string) {
    state.user = payload;
  },

  [MutationTypes.loginUser](state: State, payload: string) {
    state.user = payload;
  }
};
