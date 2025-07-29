<template>
  <!-- 注册box -->
  <div class="reg-box">
    <el-form
      ref="regFormRef"
      :model="regFormData"
      :rules="regFormRules"
      :status-icon="true"
      label-width="80px"
      class="reg-box-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="regFormData.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="regFormData.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="重复密码" prop="passwordAgain">
        <el-input
          v-model="regFormData.passwordAgain"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="验证码" prop="vertifyCode">
        <el-input v-model="regFormData.vertifyCode">
          <template #append>
            <Sidentify
              sid="regSidentify"
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
          确定
        </el-button>
        <el-button @click="toLoginForm()">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits } from "vue";
const emits = defineEmits();
onMounted(() => {
  localVerifyCode.value = generateVCode(verifyCodeLength.value);
  console.log(localVerifyCode.value);
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
const regFormData = reactive({
  username: "",
  password: "",
  passwordAgain: "",
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

const regFormRules = reactive({
  username: [{ validator: checkUsername, trigger: "change" }],
  password: [{ validator: checkPassword, trigger: "change" }],
  vertifyCode: [{ validator: checkVertifyCode, trigger: "change" }],
});

// 提交注册表单
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

// 切换登录表单
const toLoginForm = () => {
  emits("toLoginForm");
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
.reg-box {
  color: #000 !important;
  padding: 20px;
  background: #fff;
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
        margin-left: 0 !important;
      }
    }
  }
}
</style>
