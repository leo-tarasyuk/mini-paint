import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { MutationTypes } from "./mutation-types";
import { ActionTypes } from "./action-types";
import { User } from "../../types";
import { State } from "./state";
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
  [ActionTypes.initFirebase](
    { state }: AugmentedActionContext,
    payload: FirebaseConfig
  ): Promise<firebase.firestore.Firestore>;
  [ActionTypes.registerUser](
    { commit, state }: AugmentedActionContext,
    payload: User
  ): Promise<string | null>;
  [ActionTypes.loginUser](
    { commit, state }: AugmentedActionContext,
    payload: User
  ): Promise<string | null>;
  [ActionTypes.signOutUser](): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.initFirebase](context, payload: FirebaseConfig) {
    const firestore = firebase.initializeApp(payload).firestore();

    return firestore;
  },

  async [ActionTypes.registerUser]({ commit, state }, payload: User) {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        commit(MutationTypes.registerUser, data.user?.uid);
        localStorage.setItem("user", state.user);
        return null;
      })
      .catch((e: Error) => {
        return e.message;
      });

    return user;
  },

  async [ActionTypes.loginUser]({ commit, state }, payload: User) {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        commit(MutationTypes.loginUser, data.user?.uid);
        localStorage.setItem("user", state.user);
        return null;
      })
      .catch((e: Error) => {
        return e.message;
      });

    return user;
  },

  async [ActionTypes.signOutUser]() {
    await firebase.auth().signOut();
    localStorage.setItem("user", "");
  }
};
