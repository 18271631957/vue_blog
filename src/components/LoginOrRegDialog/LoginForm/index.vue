<template>
  <!-- 登录box -->
  <div class="login-box">
    <el-form
      ref="loginFormRef"
      :model="loginFormData"
      :rules="loginFormRules"
      size="default"
      label-width="auto"
      class="login-box-form"
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
              sid="loginSidentify"
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
        <el-button @click="toRegForm()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits } from "vue";
const emits = defineEmits();

onMounted(() => {
  localVerifyCode.value = generateVCode(verifyCodeLength.value);
});

// 本地生成的验证码
const localVerifyCode = ref();
// 验证码位数
const verifyCodeLength = ref(4);
// 表单对象
const loginFormRef = ref();
// 登录加载动画
const loading = ref(false);
// 登录表单数据
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

const loginFormRules = reactive({
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

// 切换注册表单
const toRegForm = () => {
  emits("toRegForm");
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
  &-form {
    :deep() {
      .el-form-item__label {
        //color: #fff;
      }
      .el-input__suffix-inner {
        color: green;
        font-size: 16px;
      }
      .el-input-group__append {
        padding: 0 2px;
        height: 30px;
      }
      .el-form-item__content {
        justify-content: center;
      }
    }
  }
}
</style>
