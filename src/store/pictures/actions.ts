import { ActionContext, ActionTree } from "vuex";

import { Mutations } from "./mutations";
import { MutationTypes } from "./mutation-types";
import { ActionTypes } from "./action-types";
import { PicturesState } from "./types";
import { RootState } from './../types';
import { Pictures } from "../../types";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<PicturesState, RootState>, "commit">;

interface Actions {
  [ActionTypes.createPicture](
    { rootGetters }: AugmentedActionContext,
    payload: Pictures
  ): void;
  [ActionTypes.showPictures](
    { commit, state }: AugmentedActionContext,
    payload: Array<Pictures>
  ): void;
}

export const actions: ActionTree<PicturesState, RootState> & Actions = {
  async [ActionTypes.createPicture]({ rootGetters }, payload: Pictures) {
    payload.user = rootGetters["user/getUser"];
    await firebase
      .database()
      .ref("pictures")
      .push(payload);
  },

  async [ActionTypes.showPictures]({ commit, state }, payload) {
    state.pictures = payload;
    const user = localStorage.getItem("user");
    const picture = await firebase
      .database()
      .ref("pictures")
      .once("value");
    const allPictures = await picture.val();

    if (allPictures !== null) {
      Object.keys(allPictures).forEach((key: string): void => {
        if (allPictures[key].user === user) {
          state.pictures.push({ ...allPictures[key] });
        }
      });
    }

    commit(MutationTypes.showPictures, state.pictures);
  }
};
