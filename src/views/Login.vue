<template>
  <Form :name="name" :text="text" :route="route" :auth="login" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { ActionTypes } from "../store/action-types";
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

    const login = async (email: string, password: string) => {
      const mistake: string | null = await dispatch(ActionTypes.loginUser, {
        email,
        password
      });
      if (mistake) {
        dispatch(ActionTypes.setError, mistake);
      } else {
        dispatch(ActionTypes.setError, "");
        router.push("/");
      }
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
