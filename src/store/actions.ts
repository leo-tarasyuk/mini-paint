import { ActionContext, ActionTree, DispatchOptions } from "vuex";
import { Mutations } from "./mutations";
import { MutationTypes } from "./mutation-types";
import { ActionTypes } from "./action-types";
import { Picture, Pictures, User } from "../types";
import { State } from "./state";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export type ActionsType = {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

interface Actions {
  [ActionTypes.registerUser](
    { commit }: AugmentedActionContext,
    payload: User
  ): Promise<string | null>;
  [ActionTypes.loginUser](
    { commit }: AugmentedActionContext,
    payload: User
  ): Promise<string | null>;
  [ActionTypes.setError](
    { commit, state }: AugmentedActionContext,
    payload: string
  ): void;
  [ActionTypes.createPicture](
    { commit, state }: AugmentedActionContext,
    payload: Picture
  ): void;
  [ActionTypes.showPictures](
    { commit, state }: AugmentedActionContext,
    payload: Array<Pictures>
  ): void;
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
  [ActionTypes.setError]({ commit }, payload: string) {
    commit(MutationTypes.setError, payload);
  },
  async [ActionTypes.createPicture]({ state }, payload: Pictures) {
    payload.user = state.user;
    await firebase
      .database()
      .ref("pictures")
      .push(payload);
  },
  async [ActionTypes.showPictures]({ commit, state }) {
    state.pictures = [];
    const task = await firebase
      .database()
      .ref("pictures")
      .once("value");
    const tasks = task.val();
    const data: Array<Pictures> = [];

    if (tasks !== null) {
      Object.keys(tasks).forEach((key: string): void => {
        if (tasks[key].user === state.user) {
          data.push({ ...tasks[key] });
        }
      });
    }

    commit(MutationTypes.showPictures, data);
  }
};
