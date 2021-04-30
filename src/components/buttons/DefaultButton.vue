<template>
  <button>{{ name }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
button {
  margin: 10px 15px;
  padding: 10px;
  border-radius: 2px;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  border: none;
  cursor: pointer;
  color: #fff;
  background-color: #3b3b3b;
  &:hover {
    opacity: 0.8;
  }
}
</style>
