import { MutationTree, CommitOptions } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationTypes.REGISTER_USER](state: S, payload: string | undefined): void;
  [MutationTypes.LOGIN_USER](state: S, payload: string | undefined): void;
  [MutationTypes.SET_ERROR](state: S, payload: string): void;
  [MutationTypes.CREATE_PICTURE](
    state: S,
    payload: Record<string, string>
  ): void;
  [MutationTypes.SHOW_PICTURES](
    state: S,
    payload: Array<Record<string, string>>
  ): void;
};

export type MutationsType = {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.REGISTER_USER](state: State, payload: string) {
    state.user = payload;
  },
  [MutationTypes.LOGIN_USER](state: State, payload: string) {
    state.user = payload;
  },
  [MutationTypes.SET_ERROR](state: State, payload: string) {
    state.error = payload;
  },
  [MutationTypes.CREATE_PICTURE](
    state: State,
    payload: Record<string, string>
  ) {
    state.picture = payload;
  },
  [MutationTypes.SHOW_PICTURES](
    state: State,
    payload: Array<Record<string, string>>
  ) {
    state.pictures = payload;
  }
};
