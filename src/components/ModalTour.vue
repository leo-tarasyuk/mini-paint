<template>
  <div class="component" :style="tour.style">
    <div
      :class="{ options_for_figure: tour.tourButton.name.length > 1 }"
      class="tour-buttons"
      :style="tour.tourButton.position"
    >
      <DefaultButton
        v-for="name of tour.tourButton.name"
        :key="name"
        :name="name"
        :style="tour.tourButton.style"
      />
    </div>
    <div
      v-if="tour.positionRectangle.state"
      class="rectangle"
      :style="tour.positionRectangle.position"
    ></div>
    <div class="modal-window" :style="tour.modalWindow.style">
      <p class="tour-text">{{ tour.caption }}.</p>
      <p class="tour-text">{{ tour.text }}</p>
      <div class="buttons">
        <DefaultButton
          v-if="tour.buttons.back"
          class="next-and-back"
          @click="showExplanation(-1)"
          :name="'Back'"
        />
        <DefaultButton class="skip" @click="goHome" :name="'Skip'" />
        <DefaultButton
          v-if="tour.buttons.next"
          class="next-and-back"
          @click="showExplanation(1)"
          :name="'Next'"
        />
      </div>
    </div>
    <canvas v-if="tour.id === 8" width="650" height="500"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";

import { AppRoutes } from "../router";

import DefaultButton from "./buttons/DefaultButton.vue";

export default defineComponent({
  components: {
    DefaultButton
  },
  props: {
    tour: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const router = useRouter();
    const { getters } = useStore();
    const email = ref(localStorage.getItem("email"));

    const goHome = (): void => {
      localStorage.setItem("user", getters["user/getUser"]);
      router.push(AppRoutes.home);
    };

    const showExplanation = (count: number): void => {
      emit("changeExplanation", count);
    };

    return {
      email,
      goHome,
      showExplanation
    };
  }
});
</script>

<style lang="scss" scoped>
.component {
  width: 350px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0);

  .tour-buttons {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 2;
    margin: 0;
  }

  .rectangle {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #25292b;
    transform: rotate(45deg);
    z-index: 2;
  }

  .modal-window {
    padding: 0 10px;
    .tour-text {
      width: 100%;
      padding: 10px 0;
      color: #fff;
      text-align: center;
    }

    .buttons {
      width: 100%;
      flex-wrap: wrap;
      display: flex;
      justify-content: space-between;

      .next-and-back {
        background-color: rgba(255, 106, 0, 1);
      }

      .skip {
        background-color: rgb(1, 128, 218);
      }
    }
  }

  canvas {
    position: absolute;
    top: 58px;
    left: -171px;
    background-color: #fff;
    z-index: -1;
  }
}
</style>
