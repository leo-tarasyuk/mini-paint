import { MutationTree, CommitOptions } from "vuex";
import { MutationTypes } from "./mutation-types";
import { Picture, Pictures } from "../types";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationTypes.registerUser](state: S, payload: string | undefined): void;
  [MutationTypes.loginUser](state: S, payload: string | undefined): void;
  [MutationTypes.setError](state: S, payload: string): void;
  [MutationTypes.createPicture](state: S, payload: Picture): void;
  [MutationTypes.showPictures](state: S, payload: Array<Pictures>): void;
};

export type MutationsType = {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.registerUser](state: State, payload: string) {
    state.user = payload;
  },
  [MutationTypes.loginUser](state: State, payload: string) {
    state.user = payload;
  },
  [MutationTypes.setError](state: State, payload: string) {
    state.error = payload;
  },
  [MutationTypes.createPicture](state: State, payload: Picture) {
    state.picture = payload;
  },
  [MutationTypes.showPictures](state: State, payload: Array<Pictures>) {
    state.pictures = payload;
  }
};
