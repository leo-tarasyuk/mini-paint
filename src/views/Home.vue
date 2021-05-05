<template>
  <Main />
  <Preloader v-show="!userProperty" />
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";

import { useStore } from "../store";

import Preloader from "../components/Preloader.vue";
import Main from "../components/Main.vue";

export default defineComponent({
  components: {
    Main,
    Preloader
  },
  setup() {
    const { getters, dispatch } = useStore();
    const userProperty = computed(() => getters["user/getUserProperty"]);

    onMounted(async () => {
      await dispatch("user/getUserParams");
    });

    return {
      userProperty
    };
  }
});
</script>
