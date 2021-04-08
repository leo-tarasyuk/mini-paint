<template>
  <div class="component" :style="tour.style">
    <button v-show="tour.id === 2" class="create-file modal-buttons-size">
      Create file
    </button>
    <button v-show="tour.id === 3" class="sign-out modal-buttons-size">
      Sign out
    </button>
    <h2 v-show="tour.id === 4">New image</h2>
    <button v-show="tour.id === 5" class="sign-out modal-buttons-size">
      ←
    </button>
    <div class="figure" v-if="tour.id === 6">
      <button v-for="figure in figures" :key="figure">{{ figure }}</button>
    </div>
    <div class="options-for-figure" v-if="tour.id === 7">
      <button>Color</button>
      <button>Size</button>
    </div>
    <div
      v-if="tour.positionRectangle.state"
      class="rectangle"
      :style="tour.positionRectangle.position"
    ></div>
    <div class="modal-window">
      <p class="tour-text">{{ tour.caption }}.</p>
      <p class="tour-text">{{ tour.text }}</p>
      <div class="buttons">
        <button
          v-if="tour.buttons.back"
          class="modal-buttons-size next-and-back"
          @click="showExplanation(-1)"
        >
          Back
        </button>
        <button class="modal-buttons-size skip" @click="goHome">Skip</button>
        <button
          v-if="tour.buttons.next"
          class="modal-buttons-size next-and-back"
          @click="showExplanation(1)"
        >
          Next
        </button>
      </div>
    </div>
    <div class="options-for-picture" v-if="tour.id === 8">
      <button class="clear">Clear</button>
      <button class="save">Save</button>
    </div>
    <canvas v-if="tour.id === 9" width="650" height="500"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import { AppRoutes } from "../router";

export default defineComponent({
  props: {
    tour: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const router = useRouter();
    const figures = ref(["∼", "/", "▭", "◯"]);

    const goHome = (): void => {
      router.push(AppRoutes.home);
    };

    const showExplanation = (count: number): void => {
      emit("changeExplanation", count);
    };

    return {
      figures,
      goHome,
      showExplanation
    };
  }
});
</script>

<style lang="scss" scoped>
.component {
  width: 330px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0);

  button {
    padding: 5px;
    margin: 5px;
    border-radius: 2px;
    font-size: 20px;
    border: none;
    cursor: pointer;
    color: #fff;
    background-color: #3b3b3b;
  }

  .modal-buttons-size {
    margin: 10px 20px;
    padding: 10px 10px;
    font-size: 13px;
    outline: none;
    font-weight: 700;
  }

  .create-file {
    position: absolute;
    top: -60px;
    left: -20px;
    background-color: #0180da;
  }

  .sign-out {
    position: absolute;
    top: -60px;
    right: -60px;
    background-color: rgba(255, 106, 0, 1);
  }

  h2 {
    position: absolute;
    top: -60px;
    left: -80px;
    padding: 14px 20px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0);
  }

  .figure {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: -193px;
    left: -7px;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0);
  }

  .options-for-picture {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 171px;
    right: -57px;
    background-color: rgba(0, 0, 0, 0);

    .save {
      background-color: green;
    }

    .clear {
      background-color: blue;
    }
  }

  .options-for-figure {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: -103px;
    right: -57px;
    background-color: rgba(0, 0, 0, 0);
  }

  .rectangle {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #25292b;
    transform: rotate(45deg);
    top: -10px;
    z-index: 2;
  }

  canvas {
    position: absolute;
    top: 77px;
    left: -179px;
    background-color: #fff;
    z-index: -1;
  }

  .modal-window {
    .tour-text {
      padding: 10px 20px;
      width: 100%;
      color: #fff;
      text-align: center;
    }

    .buttons {
      width: 100%;
      padding: 0px 20px;
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
}
</style>
