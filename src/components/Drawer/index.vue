<template>
  <aside class="drawer" :class="{ showDrawer: show }">
    <slot></slot>
  </aside>
  <!-- 遮罩层DIV -->
  <OverLay
    :show="show"
    @click="
      () => {
        show = false;
      }
    "
  ></OverLay>
</template>

<script setup>
import { ref, watch, watchEffect, defineEmits } from "vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits();
// 开关
const show = ref(props.modelValue);
// 监听 modelValue 的变化
watchEffect(() => {
  show.value = props.modelValue;
});
// 当开关变化时，自动告诉父组件
watch(show, (newValue) => {
  emits("update:modelValue", newValue);
});
</script>

<style scoped lang="scss">
@mixin drawerStyle {
  height: 100vh;
  width: 266px;
  background-color: #fff;
  position: fixed;
  top: 0px;
  left: -300px;
  z-index: 1000;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
  transition: all 0.3s ease;
  //border-right: 1px solid #dcdfe6;
}

.drawer {
  @include drawerStyle;
}
.drawer.showDrawer {
  left: 0px;
}
</style>
