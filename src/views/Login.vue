<template>
  <Form :name="name" :text="text" :route="route" :auth="login" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { MutationTypes } from "../store/mutation-types";
import Form from "../components/Form.vue";
export default defineComponent({
  components: {
    Form
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const name = ref("Login");
    const text = ref("Need an account?");
    const route = ref("/register");

    const login = (email: string, password: string): void => {
      store
        .dispatch(MutationTypes.LOGIN_USER, {
          email,
          password
        })
        .then((): void => {
          store.dispatch(MutationTypes.SET_ERROR, "");
          router.replace({ name: "Home" });
        })
        .catch((e: Error): void => {
          store.dispatch(MutationTypes.SET_ERROR, e.message);
        });
    };

    return {
      name,
      text,
      route,
      login
    };
  }
});
</script>
