import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { MutationTypes } from "./mutation-types";
import { ActionTypes } from "./action-types";
import { User } from "../../types";
import { State } from "./state";
import { Pictures } from "../../types";
import { FirebaseConfig } from "../../main";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

interface Actions {
  [ActionTypes.registerUser](
    { commit }: AugmentedActionContext,
    payload: User
  ): Promise<string | null>;
  [ActionTypes.loginUser](
    { commit }: AugmentedActionContext,
    payload: User
  ): Promise<string | null>;
  [ActionTypes.createPicture](
    { commit, state }: AugmentedActionContext,
    payload: Pictures
  ): void;
  [ActionTypes.showPictures](
    { commit, state }: AugmentedActionContext,
    payload: Array<Pictures>
  ): void;
  [ActionTypes.initFirebase](
    context: AugmentedActionContext,
    payload: FirebaseConfig
  ): Promise<firebase.firestore.Firestore>;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.registerUser]({ commit }, payload: User) {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        commit(MutationTypes.registerUser, data.user?.uid);
        return null;
      })
      .catch((e: Error) => {
        return e.message;
      });

    return user;
  },

  async [ActionTypes.loginUser]({ commit }, payload: User) {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        commit(MutationTypes.loginUser, data.user?.uid);
        return null;
      })
      .catch((e: Error) => {
        return e.message;
      });

    return user;
  },

  async [ActionTypes.createPicture]({ state }, payload: Pictures) {
    payload.user = state.user;
    await firebase
      .database()
      .ref("pictures")
      .push(payload);
  },

  async [ActionTypes.showPictures]({ commit, state }, payload) {
    state.pictures = payload;
    const picture = await firebase
      .database()
      .ref("pictures")
      .once("value");
    const allPictures = picture.val();

    if (allPictures !== null) {
      Object.keys(allPictures).forEach((key: string): void => {
        if (allPictures[key].user === state.user) {
          state.pictures.push({ ...allPictures[key] });
        }
      });
    }
    commit(MutationTypes.showPictures, state.pictures);
  },

  async [ActionTypes.initFirebase](context, payload: FirebaseConfig) {
    const firestore = await firebase.initializeApp(payload).firestore();

    return firestore;
  }
};
