import { createStore } from "vuex";
import { user } from "./user";
import { pictures } from "./pictures";

export const store = createStore({
  modules: {
    user,
    pictures
  }
});

export function useStore() {
  return store;
}
