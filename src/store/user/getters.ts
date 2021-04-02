import { GetterTree } from "vuex";
import { State } from "./state";

type Getters = {
  getUser(state: State): string;
};

export const getters: GetterTree<State, State> & Getters = {
  getUser: state => state.user
};
