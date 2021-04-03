import { MutationTree } from "vuex";

import { MutationTypes } from "./mutation-types";
import { UserState } from "./types";

export type Mutations<S = UserState> = {
  [MutationTypes.registerUser](state: S, payload: string | undefined): void;
  [MutationTypes.loginUser](state: S, payload: string | undefined): void;
};

export const mutations: MutationTree<UserState> & Mutations = {
  [MutationTypes.registerUser](state: UserState, payload: string) {
    state.user = payload;
  },

  [MutationTypes.loginUser](state: UserState, payload: string) {
    state.user = payload;
  }
};
