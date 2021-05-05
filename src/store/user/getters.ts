import { GetterTree } from "vuex";

import { UserState } from "./types";
import { RootState } from "./../types";
import { UserParameters } from "../../types";

type Getters = {
  getUser(state: UserState): string;
  getUserProperty(state: UserState): UserParameters | null;
};

export const getters: GetterTree<UserState, RootState> & Getters = {
  getUser: state => state.user,
  getUserProperty: state => state.userParams
};
