<template>
  <div class="home">
    <NavBar
      :leftIconClick="navLeftIconClick"
      @showLoginBox="() => (isShowLoginBox = true)"
    ></NavBar>
    <!-- <LoginOrRegDialog v-model="isShowLoginBox"></LoginOrRegDialog> -->
    <!-- <el-dialog v-model="isShowLoginBox" title="Warning" width="500" center>
      <span>
        It should be noted that the content will not be aligned in center by
        default
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isShowLoginBox = false">Cancel</el-button>
          <el-button type="primary" @click="isShowLoginBox = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog> -->

    <div class="banner">
      <!-- 格言横幅 -->
      <div class="banner-essay">
        <span>知行合一</span>
        <span>
          世界上最遥远的距离，不是生与死的距离，
          也不是马里亚纳海沟到珠穆朗玛峰的距离， 而是知道与做到的距离。
        </span>
      </div>
      <!-- 滑动到文章列表的锚点 -->
      <a id="anchor" ref="anchor" @click="toAnchor()" class="banner-drop-btn">
        <i class="icon-xiangxia"></i>
      </a>
    </div>

    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import articleStore from "../store/article";
const useArticleStore = articleStore();
const { proxy } = getCurrentInstance();
const pageData = reactive({
  articleCategoryList: [],
});

// 展示登录框
const isShowLoginBox = ref(false);
// 登录框关闭
const loginBoxClose = (done) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
// 打开抽屉
const navLeftIconClick = () => {
  useArticleStore.setShowDrawer(true);
};
// 滚动到文章列表
const anchor = ref(null);
const toAnchor = () => {
  if (anchor.value) {
    anchor.value.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(async () => {
  const res = await proxy.$http.get("/getArticleCategorys");
  pageData.articleCategoryList = res.data.rows;
});
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
}
.banner {
  height: 100vh;
  width: 100%;
  background: linear-gradient(87deg, #2dce89 0, #2dcecc 100%);
  text-align: center;
  display: flex;
  justify-content: center;
  &-essay {
    color: #fefefe;
    width: 100%;
    margin: 10% 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    span:first-of-type {
      font-size: 1.4rem;
    }
    span {
      display: block !important;
      width: 100%;
      overflow: hidden;
      padding: 3px;
      white-space: wrap;
      //animation: grow 5s steps(40, end);
    }

    @keyframes grow {
      from {
        width: 0;
      }

      to {
        width: 100%;
      }
    }
  }

  &-drop-btn {
    text-decoration: none;
    color: #fff;
    position: absolute;
    z-index: 10;
    bottom: 30px;
    cursor: pointer;
    i {
      font-size: 2rem;
      color: #dedede;
    }
  }

  &-drop-btn:hover {
    opacity: 0.5;
  }
}
</style>
