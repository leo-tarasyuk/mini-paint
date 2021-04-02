import { GetterTree } from "vuex";
import { State } from "./state";
import { Pictures } from "../../types";

type Getters = {
  getUser(state: State): string;
  getPictures(state: State): Array<Pictures>;
};

export const getters: GetterTree<State, State> & Getters = {
  getUser: state => state.user,
  getPictures: state => state.pictures
};
