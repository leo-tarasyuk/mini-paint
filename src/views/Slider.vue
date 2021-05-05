<template>
  <header>
    <DefaultButton class="skip" @click="goHome" :name="'Skip'" />
  </header>
  <div class="carousel">
    <div class="buttons">
      <i v-if="currentSlide" class="arrow right" @click="back(-1)"></i>
    </div>
    <div class="wrapper">
      <div class="slider" ref="slide">
        <div v-for="item in pictures" :key="item" class="slider-picture">
          <img :src="item.img" alt="" />
        </div>
      </div>
      <ul class="checkboxs">
        <li
          class="checkbox"
          v-for="(item, index) in pictures"
          :key="item"
          :class="{ checkbox_active: currentSlide === index }"
          @click="clickSlide(index)"
        ></li>
      </ul>
    </div>
    <div class="buttons">
      <i
        v-if="currentSlide < pictures.length - 1"
        @click="next(1)"
        class="arrow left"
      ></i>
    </div>
  </div>
  <Preloader v-show="!pictures.length" />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "../store";
import { AppRoutes } from "../router";

import DefaultButton from "../components/buttons/DefaultButton.vue";
import Preloader from "../components/Preloader.vue";

export default defineComponent({
  components: {
    DefaultButton,
    Preloader
  },
  setup() {
    const { dispatch, getters } = useStore();
    const router = useRouter();
    const pictures = computed(() => getters["pictures/getPictures"]);
    const slide = ref<HTMLElement | null>(null);
    const currentSlide = ref(0);

    const autoShowSlide = () => {
      const sli = slide.value;

      setTimeout(() => {
        if (sli && currentSlide.value < pictures.value.length - 1) {
          currentSlide.value++;
          sli.style.transform = `translate(${-100 * currentSlide.value}%)`;
          autoShowSlide();
        } else if (sli && currentSlide.value >= pictures.value.length - 1) {
          sli.style.transform = "translate(0)";
          currentSlide.value = 0;
          autoShowSlide();
        }
      }, 3000);
    };

    onMounted(() => {
      dispatch("pictures/showRandomPictures", []);
      autoShowSlide();
    });

    const clickSlide = (index: number): void => {
      const sli = slide.value;

      if (sli) {
        currentSlide.value = index;
        sli.style.transform = `translate(${-100 * currentSlide.value}%)`;
      }
    };

    const next = (num: number): void => {
      const sli = slide.value;

      if (sli && currentSlide.value < pictures.value.length - 1) {
        currentSlide.value += num;
        sli.style.transform = `translate(${-100 * currentSlide.value}%)`;
      }
    };

    const back = (num: number): void => {
      const sli = slide.value;

      if (sli && currentSlide.value > 0) {
        currentSlide.value += num;
        sli.style.transform = `translate(${-100 * currentSlide.value}%)`;
      }
    };

    const goHome = () => router.push(AppRoutes.home);

    return {
      pictures,
      slide,
      currentSlide,
      autoShowSlide,
      clickSlide,
      next,
      back,
      goHome
    };
  }
});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  z-index: 10;

  .skip {
    background-color: #0180da;
  }
}
.carousel {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;

  .wrapper {
    width: 652px;
    height: auto;
    overflow: hidden;
    z-index: 2;

    .slider {
      display: flex;
      transition: 1s;

      img {
        background-color: #fff;
        border: 1px solid #000;
      }
    }

    .checkboxs {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .checkbox {
        width: 20px;
        height: 10px;
        margin: 0px 5px;
        list-style: none;
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.5);
      }

      .checkbox_active {
        background-color: rgba(255, 255, 255, 1);
      }
    }
  }
  .buttons {
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;

    .arrow {
      position: relative;
      display: inline-block;
      color: rgba(255, 255, 255, 0.5);
      border: 15px solid transparent;
      border-top: 15px solid;
      border-right: 15px solid;
      cursor: pointer;
      &:hover {
        color: rgba(255, 255, 255, 1);
      }
    }

    .left {
      transform: rotate(45deg);
    }

    .right {
      transform: rotate(-135deg);
    }
  }
}
</style>
