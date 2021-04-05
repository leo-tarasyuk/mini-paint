<template>
  <Form :name="name" :text="text" :route="route" :auth="login" :error="error" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "../store";
import { AppRoutes } from "../router";

import Form from "../components/Form.vue";

export default defineComponent({
  components: {
    Form
  },
  setup() {
    const { dispatch } = useStore();
    const router = useRouter();
    const name = ref("Login");
    const text = ref("Need an account?");
    const route = ref("/register");
    const error = ref("");

    const login = async (email: string, password: string) => {
      const mistake: string | null = await dispatch("user/loginUser", {
        email,
        password
      });

      if (mistake) {
        error.value = mistake;
      } else {
        error.value = "";
        router.push(AppRoutes.home);
      }
    };

    return {
      name,
      text,
      route,
      login,
      error
    };
  }
});
</script>
