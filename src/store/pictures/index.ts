import { Module } from "vuex";
import { State } from "../user/state";
import { PicturesState, state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

export const pictures: Module<PicturesState, State> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
