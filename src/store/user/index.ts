import { Module } from "vuex";
import { State, state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

export const user: Module<State, State> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
