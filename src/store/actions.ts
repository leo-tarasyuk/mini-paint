import { ActionContext, ActionTree, DispatchOptions } from "vuex";
import { Mutations } from "./mutations";
import { MutationTypes } from "./mutation-types";
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
  [MutationTypes.REGISTER_USER](
    { commit }: AugmentedActionContext,
    payload: Record<string, string>
  ): Promise<void>;
  [MutationTypes.LOGIN_USER](
    { commit }: AugmentedActionContext,
    payload: Record<string, string>
  ): Promise<void>;
  [MutationTypes.SET_ERROR](
    { commit, state }: AugmentedActionContext,
    payload: string
  ): void;
  [MutationTypes.CREATE_PICTURE](
    { commit, state }: AugmentedActionContext,
    payload: Record<string, string>
  ): void;
  [MutationTypes.SHOW_PICTURES](
    { commit, state }: AugmentedActionContext,
    payload: Array<Record<string, string>>
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  async [MutationTypes.REGISTER_USER](
    { commit },
    payload: Record<string, string>
  ) {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password);

    commit(MutationTypes.REGISTER_USER, user.user?.uid);
  },
  async [MutationTypes.LOGIN_USER](
    { commit },
    payload: Record<string, string>
  ) {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password);

    commit(MutationTypes.LOGIN_USER, user.user?.uid);
  },
  [MutationTypes.SET_ERROR]({ commit }, payload: string) {
    commit(MutationTypes.SET_ERROR, payload);
  },
  async [MutationTypes.CREATE_PICTURE](
    { state },
    payload: Record<string, string>
  ) {
    payload.user = state.user;
    await firebase
      .database()
      .ref("pictures")
      .push(payload);
  },
  async [MutationTypes.SHOW_PICTURES]({ commit, state }) {
    const task = await firebase
      .database()
      .ref("pictures")
      .once("value");
    const tasks = task.val();
    const data: Array<Record<string, string>> = [];

    if (tasks !== null) {
      Object.keys(tasks).forEach((key: string): void => {
        if (tasks[key].user === state.user) {
          data.push({ ...tasks[key] });
        }
      });
    }

    commit(MutationTypes.SHOW_PICTURES, data);
  }
};
