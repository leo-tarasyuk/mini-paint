<template>
  <div class="modal" @click="showModalWindow(false)">
    <div @click="stopProp">
      <div class="modal-head">
        <span class="close" @click="showModalWindow(false)"></span>
      </div>
      <div class="component">
        <div class="task-name">
          Name :
          <input v-model="name" class="name" type="text" />
        </div>
        <div class="buttons">
          <DefaultButton
            class="save"
            @click="downloadImage({ img, name })"
            :name="'Save'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "../store";
import { AppRoutes } from "../router";
import { Pictures } from "../types";

import DefaultButton from "./buttons/DefaultButton.vue";

export default defineComponent({
  components: {
    DefaultButton
  },
  props: {
    img: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const { dispatch } = useStore();
    const router = useRouter();
    const name = ref("");

    const downloadImage = (picture: Pictures): void => {
      if (name.value) {
        dispatch("pictures/createPicture", picture);
        router.push(AppRoutes.home);
      }
    };

    const stopProp = (event: Event): void => {
      event.stopPropagation();
    };

    const showModalWindow = (state: boolean): void => {
      emit("stateChanged", state);
    };

    return {
      name,
      downloadImage,
      showModalWindow,
      stopProp
    };
  }
});
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);

  .modal-head {
    height: 30px;
    display: flex;
    align-items: center;
    position: relative;
    padding-bottom: 10px;

    .close {
      position: absolute;
      right: 10px;
      width: 20px;
      height: 20px;
      opacity: 0.3;
      &:hover {
        opacity: 1;
      }
      &:before,
      &:after {
        position: absolute;
        left: 15px;
        content: " ";
        height: 20px;
        width: 2px;
        background-color: #fff;
      }
      &:before {
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
    }
  }

  .component {
    min-width: 300px;
    height: 100px;
    display: flex;
    flex-direction: column;

    .task-name {
      margin: 0;
      font-size: 20px;
      padding: 0px 0px 20px 10px;
      color: #fff;

      .name {
        width: 70%;
        background-color: #fff;
        font-size: 20px;
        border: none;
        outline: none;
      }
    }

    .save {
      background: rgba(255, 106, 0, 1);
    }
  }
}
</style>
