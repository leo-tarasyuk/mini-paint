import { GetterTree } from "vuex";

import { UserState } from "./types";
import { RootState } from "./../types";

type Getters = {
  getUser(state: UserState): string;
};

export const getters: GetterTree<UserState, RootState> & Getters = {
  getUser: state => state.user
};
