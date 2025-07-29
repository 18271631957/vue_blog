<template>
  <div class="nav-bar">
    <div class="nav-bar-container">
      <i class="icon-fenlei2 hidden-pc-and-up" @click="leftIconClick"></i>
      <!-- <img
        class="nav-img hidden-pc-and-down"
        alt="Vue logo"
        src="../../assets/logo.jpg"
      /> -->
      <ul>
        <li @click="toHome">
          <i class="icon-shouye"></i>
          <span>首页</span>
        </li>
      </ul>
      <img
        class="nav-img hidden-pc-and-down"
        alt="Vue logo"
        src="../../assets/logo.jpg"
      />
      <!-- <span style="margin: 0 18px 0 10px; cursor: pointer" @click="showLoginBox"
        >登录</span
      > -->
      <!-- <i class="icon-sousuo1" style="cursor: pointer"></i> -->
    </div>
  </div>
</template>

<script setup>
import { defineOptions } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
defineOptions({
  name: "NavBar",
});
const emit = defineEmits(["showLoginBox"]);
const props = defineProps({
  name: String,
  leftIconClick: Function,
});
// 显示登录框
const showLoginBox = () => {
  emit("showLoginBox");
};
const toHome = () => {
  if (route.path === "/") {
    // 刷新当前路由
    location.reload();
  } else {
    router.push({ path: "/" });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* 设置大屏幕 */
.nav-bar-container {
  width: 100% !important;
  padding: 0 20px;
}
.nav-img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  //padding: 5px
}
.nav-bar {
  background-color: rgba(#009688, 0.8);
  font-family: "Open Sans", sans-serif;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;

  &-container {
    width: 90%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    .icon-fenlei2 {
      font-size: 1.2rem;
      cursor: pointer;
    }

    ul {
      height: 60px;
      line-height: 60px;
      margin-left: 10px;
      list-style-type: none;
      flex: 1;
    }

    li {
      padding: 1rem;
      line-height: 1.5rem;
      //inline-flex 让li元素变成具有display:flex属性的div
      display: inline-flex;
      align-items: center;

      span {
        letter-spacing: 0px;
        text-align: center;
        margin-left: 8px;
        font-weight: 500;
      }
    }

    li:hover {
      cursor: pointer;
      opacity: 0.3;
    }
  }
}
</style>
