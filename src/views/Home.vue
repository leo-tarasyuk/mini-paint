<template>
  <header>
    <button class="create-file" @click="createFile()">Create file</button>
    <button class="sign-out" @click="signOut()">Sign out</button>
  </header>
  <main>
    <ul>
      <li v-for="item in getPictures" :key="item">
        <img :src="item.img" alt="" />
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { ActionTypes } from "../store/action-types";
import { AppRoutes } from "../router";
import firebase from "firebase/app";
import "firebase/auth";

export default defineComponent({
  setup() {
    const { getters, dispatch } = useStore();
    const router = useRouter();
    const getPictures = computed(() => getters.getPictures);

    onMounted((): void => {
      dispatch(ActionTypes.showPictures, []);
    });

    const signOut = async (): Promise<void> => {
      await firebase.auth().signOut();
      router.replace(AppRoutes.login);
    };
    const createFile = () => router.push(AppRoutes.image);

    return {
      signOut,
      createFile,
      getPictures
    };
  }
});
</script>

<style lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #000;
  button {
    margin: 10px 20px;
    padding: 10px 20px;
    border-radius: 2px;
    font-size: 13px;
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    &:hover {
      opacity: 0.8;
    }
  }
  .create-file {
    background-color: #0180da;
  }
  .sign-out {
    background-color: rgba(255, 106, 0, 1);
  }
}
main {
  padding-top: 20px;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    li {
      list-style: none;
      padding: 0px 10px;
      p {
        padding: 10px 0px;
        text-align: center;
        font-size: 18px;
        color: #fff;
      }
      img {
        width: 260px;
        height: 200px;
        background-color: #fff;
      }
    }
  }
}
</style>
