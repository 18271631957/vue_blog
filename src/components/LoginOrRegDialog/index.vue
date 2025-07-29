<template>
  <div>
    <el-dialog
      v-model="isShowLoginOrRegBox"
      :title="isLoginForm ? '登录' : '注册'"
      width="500"
      :close-on-click-modal="false"
      center
    >
      <!-- 登录box -->
      <LoginForm
        v-show="isLoginForm"
        @toRegForm="() => (isLoginForm = false)"
      ></LoginForm>
      <!-- 注册box -->
      <RegForm
        v-show="!isLoginForm"
        @toLoginForm="() => (isLoginForm = true)"
      ></RegForm>
    </el-dialog>
  </div>
</template>

<script setup>
import LoginForm from "./LoginForm/index.vue";
import RegForm from "./RegForm/index.vue";
import { ref, reactive, watch, watchEffect, defineEmits } from "vue";
const emits = defineEmits();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
// 展示登录或注册框
const isShowLoginOrRegBox = ref(false);
// 展示登录或注册表单
const isLoginForm = ref(true);

// 监听modelValue的变化
watchEffect(() => {
  isShowLoginOrRegBox.value = props.modelValue;
});

// 当开关变化时，自动告诉父组件
watch(isShowLoginOrRegBox, (newValue) => {
  emits("update:modelValue", newValue);
});
</script>

<style lang="scss" scoped></style>
