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
          <button class="save" @click="downloadImage({ img, name })">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { ActionTypes } from "../store/action-types";
import { Picture } from "../types";
export default defineComponent({
  props: {
    img: {
      type: String,
      required: true
    }
  },
  emits: ["stateChanged"],
  setup(props, { emit }) {
    const { dispatch } = useStore();
    const router = useRouter();
    const name = ref("");

    const downloadImage = (picture: Picture): void => {
      if (name.value) {
        dispatch(ActionTypes.createPicture, picture);
        router.push("/");
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
    .buttons {
      .save {
        width: 100px;
        height: 40px;
        border-radius: 5px;
        background: rgba(255, 106, 0, 1);
        border: none;
        color: #fff;
        cursor: pointer;
        display: block;
        font-size: 16px;
        outline: none;
        margin: 10px 0px 0px 20px;
        &:hover {
          background: rgba(255, 106, 0, 0.7);
        }
      }
    }
  }
}
</style>
