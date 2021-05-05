<template>
  <header>
    <div>
      <DefaultButton
        class="header-buttons"
        @click="settings()"
        :name="'Settings'"
      />
    </div>
    <div></div>
    <div class="header-component">
      <img v-if="avatar" :src="avatar" />
      <p>{{ email }}</p>
      <div>
        <DefaultButton
          class="header-buttons"
          @click="signOut()"
          :name="'Sign out'"
        />
      </div>
    </div>
  </header>
  <main>
    <nav>
      <div class="button">
        <DefaultButton
          class="nav-buttons"
          @click="createFile()"
          :name="'Create file'"
        />
      </div>
      <div v-if="pictures.length > 4" class="button">
        <DefaultButton class="nav-buttons" @click="slider()" :name="'Slider'" />
      </div>
    </nav>
    <h2>Pictures</h2>
    <ul>
      <li v-for="item in pictures" :key="item">
        <img :src="item.img" alt="" />
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "../store";
import { AppRoutes } from "../router";

import DefaultButton from "./buttons/DefaultButton.vue";

export default defineComponent({
  components: {
    DefaultButton
  },
  setup() {
    const { getters, dispatch } = useStore();
    const router = useRouter();
    const pictures = computed(() => getters["pictures/getPictures"]);
    const userProperty = computed(() => getters["user/getUserProperty"]);
    const avatar = ref("");
    const email = ref("");

    const slider = () => router.push(AppRoutes.slider);
    const settings = () => router.push(AppRoutes.settings);
    const createFile = () => router.push(AppRoutes.image);
    const signOut = async (): Promise<void> => {
      await dispatch("user/signOutUser");
      router.replace(AppRoutes.login);
    };

    onMounted(async () => {
      await dispatch("user/getUserParams");
      await dispatch("pictures/showPictures", []);
      avatar.value = userProperty.value.image;
      email.value = userProperty.value.email;
    });

    return {
      pictures,
      userProperty,
      avatar,
      email,
      slider,
      settings,
      createFile,
      signOut
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

  .header-component {
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      background-image: cover;
    }

    p {
      padding-left: 5px;
      color: #fff;
    }
  }

  .header-buttons {
    background-color: rgba(255, 106, 0, 1);
  }
}

main {
  nav {
    display: flex;
    border-bottom: 1px solid #000;

    .nav-buttons {
      background-color: #0180da;
    }
  }

  h2 {
    width: 100%;
    color: rgba(255, 106, 0, 1);
    text-align: center;
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
</style>
