import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

export interface FirebaseConfig {
  readonly apiKey: string;
  readonly authDomain: string;
  readonly projectId: string;
  readonly databaseURL: string;
  readonly storageBucket: string;
  readonly messagingSenderId: string;
  readonly appId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  databaseURL: process.env.VUE_APP_DATABASE_URI,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MSI,
  appId: process.env.VUE_APP_ID
};

const firestore = store.dispatch("user/initFirebase", firebaseConfig);

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

export default firestore;
