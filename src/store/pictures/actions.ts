import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { MutationTypes } from "./mutation-types";
import { ActionTypes } from "./action-types";
import { State } from "../user/state";
import { PicturesState } from "./state";
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
} & Omit<ActionContext<PicturesState, State>, "commit">;

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

export const actions: ActionTree<PicturesState, State> & Actions = {
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
    
    firebase
      .database()
      .ref("pictures")
      .orderByChild("user")
      .on("child_added", function(snapshot) {
        if (snapshot.val().user === user) {
          state.pictures.push(snapshot.val());
        }
      });

    commit(MutationTypes.showPictures, state.pictures);
  }
};
