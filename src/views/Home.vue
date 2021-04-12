<template>
  <header>
    <div></div>
    <button class="sign-out" @click="signOut()">Sign out</button>
  </header>
  <main>
    <nav>
      <div class="button">
        <button class="nav-buttons" @click="createFile()">Create file</button>
      </div>
      <div v-if="pictures.length > 4" class="button">
        <button class="nav-buttons" @click="slider()">Slider</button>
      </div>
    </nav>
    <ul>
      <li v-for="item in pictures" :key="item">
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
import { AppRoutes } from "../router";

export default defineComponent({
  setup() {
    const { getters, dispatch } = useStore();
    const router = useRouter();
    const pictures = computed(() => getters["pictures/getPictures"]);

    onMounted(() => {
      dispatch("pictures/showPictures", []);
    });

    const slider = () => router.push(AppRoutes.slider);

    const signOut = async (): Promise<void> => {
      await dispatch("user/signOutUser");
      router.replace(AppRoutes.login);
    };

    const createFile = () => router.push(AppRoutes.image);

    return {
      signOut,
      createFile,
      pictures,
      slider
    };
  }
});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #000;

  .sign-out {
    background-color: rgba(255, 106, 0, 1);
  }
}

main {
  nav {
    display: flex;
    border-bottom: 1px solid #000;
    .button {
      .nav-buttons {
        background-color: #0180da;
      }
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 10px;

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
</style>
