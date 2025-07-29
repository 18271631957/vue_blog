<template>
  <div class="overlay" @click="maskClick" :class="{ active: show }">
    <slot></slot>
  </div>
</template>

<script setup>
import { watch, defineProps } from "vue";
const props = defineProps({
  maskClick: Function,
  show: {
    type: Boolean,
    default: false, // 这里设置默认值
  },
});

// 监听 show 的变化，并据此添加或移除 no-scroll 类
watch(
  () => props.show,
  (newVal) => {
    // console.log(newVal);
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);
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
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
}

.overlay.active {
  /* 遮罩层显示时的样式 */
  display: block !important;
}
</style>
