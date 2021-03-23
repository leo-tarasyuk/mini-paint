import { GetterTree } from "vuex";
import { State } from "./state";
import { Pictures } from "../types";

type Getters = {
  getUser(state: State): string;
  getError(state: State): string;
  getPictures(state: State): Array<Pictures>;
};

export type GettersType = {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export const getters: GetterTree<State, State> & Getters = {
  getUser: state => state.user,
  getError: state => state.error,
  getPictures: state => state.pictures
};
