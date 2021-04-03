import { InjectionKey } from 'vue'
import {
  createStore, useStore as baseUseStore,
  StoreOptions, Store
} from "vuex";

import { user } from "./user";
import { pictures } from "./pictures";
import { RootState } from './types';

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store: StoreOptions<RootState> = createStore<RootState>({
  state: {
    isAppInitialized: false
  },

  modules: {
    user,
    pictures
  }
});

export function useStore() {
  return baseUseStore(key);
}
