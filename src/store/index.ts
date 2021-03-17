import { createStore, Store as StoreType } from "vuex";
import { State, state } from "./state";
import { GettersType, getters } from "./getters";
import { MutationsType, mutations } from "./mutations";
import { ActionsType, actions } from "./actions";

export type Store = Omit<StoreType<State>, "getters" | "commit" | "dispatch"> &
  GettersType &
  MutationsType &
  ActionsType;

export const store = createStore({
  state,
  mutations,
  actions,
  getters
});

export function useStore() {
  return store as Store;
}
