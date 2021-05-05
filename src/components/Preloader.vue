<template>
  <div class="preloader">
    <ul>
      <li v-for="circle of circles" :key="circle"></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const circles = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    return {
      circles
    };
  }
});
</script>

<style lang="scss">
.preloader {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: #25292b;
  opacity: 0.9;
  z-index: 99;

  ul {
    position: absolute;
    left: calc(50% - 12.5px);
    top: calc(50% - 75px);

    li {
      width: 25px;
      height: 25px;
      position: absolute;
      padding-bottom: 100px;
      list-style: none;
      background-color: unset;
      animation: dotAnimation 2.5s infinite;
      &::after {
        width: 25px;
        height: 25px;
        position: absolute;
        content: "";
        display: block;
        background-color: rgba(255, 106, 0, 1);
        border-radius: 100%;
      }

      @keyframes dotAnimation {
        0%,
        55%,
        100% {
          padding: 0 0 100px 0;
        }
        5%,
        50% {
          padding: 50px 0;
        }
      }
    }

    @for $i from 1 through 10 {
      li:nth-child(#{$i}) {
        transform: rotate(($i - 1) * (360deg / 10));
        animation-delay: 2.5s * $i/10/2;
      }
    }
  }
}
</style>
