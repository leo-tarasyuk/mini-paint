import { createStore } from "vuex";
import { user } from "./user";

export const store = createStore({
  modules: {
    user
  }
});

export function useStore() {
  return store;
}
