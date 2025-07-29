<template>
  <div>
    <el-dialog
      v-model="isShowLoginBox"
      title="登录"
      width="500"
      :close-on-click-modal="false"
      center
    >
      <div class="login-box">
        <!-- :status-icon="true" -->
        <el-form
          ref="loginFormRef"
          :model="loginFormData"
          :rules="rules"
          size="large"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="loginFormData.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginFormData.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="验证码" prop="vertifyCode">
            <el-input v-model="loginFormData.vertifyCode">
              <template #append>
                <Sidentify
                  :identifyCode="localVerifyCode"
                  @click="refreshVertifyCode()"
                ></Sidentify>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              @click="submitLoginForm(loginFormRef)"
            >
              登录
            </el-button>
            <el-button @click="resetForm(loginFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, watch, watchEffect, defineEmits, onMounted } from "vue";
const emits = defineEmits();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  localVerifyCode.value = generateVCode(verifyCodeLength.value);
});

// 展示登录框
const isShowLoginBox = ref(false);
// 监听modelValue的变化
watchEffect(() => {
  isShowLoginBox.value = props.modelValue;
});
// 当开关变化时，自动告诉父组件
watch(isShowLoginBox, (newValue) => {
  emits("update:modelValue", newValue);
});

// 本地生成的验证码
const localVerifyCode = ref();
// 验证码位数
const verifyCodeLength = ref(4);
// 表单对象
const loginFormRef = ref();
// 登录加载动画
const loading = ref(false);
// 表单数据
const loginFormData = reactive({
  username: "",
  password: "",
  vertifyCode: "",
});

const checkUsername = (_rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else if (value.length < 5 || value.length > 14) {
    callback(new Error("请输入合法的账号"));
  } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
    callback(new Error("账号不能包含特殊字符"));
  } else {
    callback();
  }
};

const checkPassword = (_rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (value.length < 5 || value.length > 14) {
    callback(new Error("请输入合法的账号"));
  } else {
    callback();
  }
};

const checkVertifyCode = (_rule, value, callback) => {
  if (value == "") {
    callback(new Error("请输入验证码"));
  } else {
    callback();
  }
};

const rules = reactive({
  username: [{ validator: checkUsername, trigger: "blur" }],
  password: [{ validator: checkPassword, trigger: "blur" }],
  vertifyCode: [{ validator: checkVertifyCode, trigger: "blur" }],
});

// 提交登录表单
const submitLoginForm = (loginFormRef) => {
  if (!loginFormRef) return;
  loginFormRef.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      console.log("submit!");
      try {
      } finally {
        loading.value = false;
      }
    } else {
      console.log("error submit!");
    }
  });
};

// 重置表单项
const resetForm = (loginFormRef) => {
  if (!loginFormRef) return;
  loginFormRef.resetFields();
};

// 随机生成验证码
const generateVCode = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// 刷新验证码
const refreshVertifyCode = () => {
  localVerifyCode.value = generateVCode(verifyCodeLength.value);
};
</script>

<style lang="scss" scoped>
.login-box {
  color: #000 !important;
  // border-radius: 10px;
  padding: 20px;
  background: #fff;
  // box-shadow: 0 3px 30px -2px #55555514, 0 3px 40px #5555550f, 0 1px 30px #55555508;
  color: #fff;
  :deep() {
    .el-form-item__label {
      //color: #fff;
    }
    .el-input__suffix-inner {
      color: green;
      font-size: 16px;
    }
    .el-form-item {
      margin-bottom: 30px;
    }
    .el-form-item__error {
      font-size: 16px;
    }
    .el-input-group__append {
      padding: 0 2px;
      height: 38px;
    }
  }

  &-submit-div {
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
