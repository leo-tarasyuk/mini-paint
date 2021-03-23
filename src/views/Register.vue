<template>
  <Form :name="name" :text="text" :route="route" :auth="register" />
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
    const name = ref("Register");
    const text = ref("Have an account?");
    const route = ref("/login");

    const register = async (email: string, password: string) => {
      const mistake = await dispatch(ActionTypes.registerUser, {
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
      register
    };
  }
});
</script>
