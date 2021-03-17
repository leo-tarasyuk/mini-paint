<template>
  <div class="login-and-register">
    <form class="form" @submit.prevent="auth(email, password)">
      <p class="logo-page">{{ name }}</p>
      <div class="form-group">
        <label v-if="!email" for="email">Email</label>
        <input id="email" v-model="email" type="email" />
      </div>
      <div class="form-group">
        <label v-if="!password" for="password">Password</label>
        <input id="password" v-model="password" type="password" />
      </div>
      <div v-if="getError" class="error">{{ getError }}</div>
      <div class="form-group">
        <button class="submit" type="submit">{{ name }}</button>
      </div>
      <div class="change-page">
        {{ text }}
        <router-link :to="route">Click here</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "../store";
export default defineComponent({
  setup() {
    const store = useStore();
    const email = ref("");
    const password = ref("");

    const getError = computed(() => store.getters.getError);

    return {
      email,
      password,
      getError
    };
  },
  props: {
    name: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    auth: {
      type: Function,
      required: true
    }
  }
});
</script>

<style lang="scss">
.login-and-register {
  margin: 0 auto;
  width: 320px;
  padding-top: 200px;
  .form {
    color: #bebebe;
    background: #181c1d;
    margin: 0 auto;
    border-radius: 2px;
    .logo-page {
      padding: 10px;
      background: #181c1d;
      text-align: center;
      border-bottom: 1px solid #000;
      box-shadow: 0 1px 0 0 #2f3234;
      color: #bebebe;
      font-weight: 700;
    }
    .form-group {
      position: relative;
      margin: 20px 20px;
      label {
        position: absolute;
        top: 8px;
        color: #2f3234;
        font-size: 16px;
        display: inline-block;
        padding: 5px 10px;
        font-weight: 400;
        background-color: rgba(255, 255, 255, 0);
      }
      input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        outline: none;
        background: #bebebe;
        border: 1px solid #2f3234;
        font-size: 20px;
        padding: 8px;
        border-radius: 2px;
      }
      button {
        width: 100%;
        background: rgba(255, 106, 0, 1);
        border-radius: 2px;
        border: none;
        color: #fff;
        cursor: pointer;
        display: block;
        font-size: 16px;
        line-height: 15px;
        outline: none;
        padding: 10px;
        &:hover {
          background: rgba(255, 106, 0, 0.7);
        }
      }
      .error {
        margin: 0;
        text-align: center;
        color: red;
        font-size: 16pх;
        padding-bottom: 10px;
      }
    }
    .change-page {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
      background: #181c1d;
      a {
        padding-left: 5px;
        background: #181c1d;
        color: #bebebe;
      }
    }
  }
}
</style>
