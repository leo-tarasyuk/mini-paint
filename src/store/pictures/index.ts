import { Module } from "vuex";

import { RootState } from './../types'
import { PicturesState } from './types';
import { state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

export const pictures: Module<PicturesState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
