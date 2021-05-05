import { ActionContext, ActionTree } from "vuex";

import { Mutations } from "./mutations";
import { MutationTypes } from "./mutation-types";
import { ActionTypes } from "./action-types";
import { UserState } from "./types";
import { RootState } from "./../types";
import { User, UserParameters, FirebaseConfig } from "../../types";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserState, RootState>, "commit">;

interface Actions {
  [ActionTypes.initFirebase](
    { state }: AugmentedActionContext,
    payload: FirebaseConfig
  ): Promise<firebase.firestore.Firestore>;
  [ActionTypes.registerUser](
    { dispatch, commit, state }: AugmentedActionContext,
    payload: User
  ): Promise<string | null>;
  [ActionTypes.loginUser](
    { commit, state }: AugmentedActionContext,
    payload: User
  ): Promise<string | null>;
  [ActionTypes.signOutUser](): Promise<void>;
  [ActionTypes.setUserParams](
    context: AugmentedActionContext,
    payload: UserParameters
  ): void;
  [ActionTypes.getUserParams]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<UserState, RootState> & Actions = {
  async [ActionTypes.initFirebase](context, payload: FirebaseConfig) {
    const firestore = firebase.initializeApp(payload).firestore();

    return firestore;
  },

  async [ActionTypes.registerUser]({ dispatch, commit, state }, payload: User) {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        commit(MutationTypes.registerUser, data.user?.uid);
        localStorage.setItem("user", state.user);
        dispatch(ActionTypes.setUserParams, {
          biography: "",
          birthday: "",
          city: "",
          email: payload.email,
          gender: "Male",
          id: localStorage.getItem("user"),
          image:
            "https://w7.pngwing.com/pngs/407/879/png-transparent-computer-icons-user-login-others-miscellaneous-monochrome-chemistry.png",
          job: {
            status: "",
            organization: "",
            position: ""
          },
          name: "",
          status: "",
          surname: "",
          telephone: ""
        });
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
  },

  async [ActionTypes.setUserParams](context, payload: UserParameters) {
    const user = localStorage.getItem("user");

    await firebase
      .database()
      .ref(`property/${user}`)
      .set(payload);
  },

  async [ActionTypes.getUserParams]({ commit }) {
    const user = localStorage.getItem("user");

    const property = await firebase
      .database()
      .ref(`property/${user}`)
      .get();

    commit(MutationTypes.getUserParams, property.val());
  }
};
