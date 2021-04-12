import { ActionContext, ActionTree } from "vuex";

import { Mutations } from "./mutations";
import { MutationTypes } from "./mutation-types";
import { ActionTypes } from "./action-types";
import { PicturesState } from "./types";
import { RootState } from "./../types";
import { Pictures } from "../../types";
import shuffle from "./helpers/helpers";

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
    context: AugmentedActionContext,
    payload: Pictures
  ): void;
  [ActionTypes.showPictures](
    { commit, state }: AugmentedActionContext,
    payload: Array<Pictures>
  ): void;
  [ActionTypes.showRandomPictures](
    { commit, dispatch }: AugmentedActionContext,
    payload: Array<Pictures>
  ): void;
}

export const actions: ActionTree<PicturesState, RootState> & Actions = {
  async [ActionTypes.createPicture](context, payload: Pictures) {
    const user = localStorage.getItem("user");

    await firebase
      .database()
      .ref(`users/${user}/pictures`)
      .push(payload);
  },

  [ActionTypes.showPictures]({ commit, state }, payload) {
    commit(MutationTypes.showPictures, payload);
    const user = localStorage.getItem("user");

    firebase
      .database()
      .ref(`users/${user}/pictures`)
      .on("child_added", function(snapshot) {
        state.pictures.push(snapshot.val());
      });

    commit(MutationTypes.showPictures, state.pictures);

    return state.pictures;
  },

  async [ActionTypes.showRandomPictures]({ commit, dispatch }, payload) {
    const pictures = await dispatch(ActionTypes.showPictures, payload);

    commit(MutationTypes.showPictures, shuffle(pictures));
  }
};
