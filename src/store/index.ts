import { InjectionKey } from "vue";
import {
  createStore,
  useStore as baseUseStore,
  Store,
  ActionTree,
  MutationTree
} from "vuex";

import { user } from "./user";
import { ActionTypes as UserActionTypes } from "./user/action-types";
import { pictures } from "./pictures";
import { RootState } from "./types";
import { FirebaseConfig } from "../types";

export const key: InjectionKey<Store<RootState>> = Symbol();

export enum MutationType {
  appStatusChanged = "APP_STATUS_CHANGED"
}

const mutations: MutationTree<RootState> = {
  [MutationType.appStatusChanged](state: RootState, status: boolean) {
    state.isAppInitialized = status;
  }
};

export enum ActionType {
  initApp = "initApp"
}

const actions: ActionTree<RootState, RootState> = {
  async [ActionType.initApp]({ dispatch, commit }) {
    const firebaseConfig: FirebaseConfig = {
      apiKey: process.env.VUE_APP_API_KEY,
      authDomain: process.env.VUE_APP_AUTH_DOMAIN,
      projectId: process.env.VUE_APP_PROJECT_ID,
      databaseURL: process.env.VUE_APP_DATABASE_URI,
      storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_MSI,
      appId: process.env.VUE_APP_ID
    };
    const firestore = await dispatch(
      `user/${UserActionTypes.initFirebase}`,
      firebaseConfig
    );

    const isAppInitialized = true;
    commit(MutationType.appStatusChanged, isAppInitialized);

    return firestore;
  }
};

export const store = createStore<RootState>({
  state: {
    isAppInitialized: false
  },
  mutations,
  actions,

  modules: {
    user,
    pictures
  }
});

export function useStore() {
  return baseUseStore(key);
}
