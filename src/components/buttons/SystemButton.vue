<template>
  <button type="submit">{{ name }}</button>
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
  width: 100%;
  background: rgba(255, 106, 0, 1);
  border-radius: 2px;
  border: none;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 16px;
  line-height: 15px;
  outline: none;
  padding: 10px;
  &:hover {
    background: rgba(255, 106, 0, 0.7);
  }
}
</style>
