import { createApp } from "vue";

import router from "./router";
import { store, key, ActionType } from "./store";

import App from "./App.vue";

const firebaseFirestore = store.dispatch(ActionType.initApp);

createApp(App)
  .use(store, key)
  .use(router)
  .mount("#app");

export default firebaseFirestore;
