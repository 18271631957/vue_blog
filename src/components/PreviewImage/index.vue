<template>
  <div class="overlay" @click="maskClick" :style="maskStyle"></div>
</template>

<script setup>
import { computed, defineProps } from "vue";
const props = defineProps({
  maskClick: Function,
  show: {
    type: Boolean,
    default: false, // 这里设置默认值
  },
});
const maskStyle = computed(() => {
  if (props.show) {
    return `display:block`;
  } else {
    return ``;
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* 设置中等屏幕 */
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  -moz-opacity: 0.8;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}
</style>
