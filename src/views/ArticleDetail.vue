<template>
  <div class="content">
    <div class="hidden-pc-and-up">
      <Drawer v-model="useArticleStore.showDrawer">
        <ArticleNavigator></ArticleNavigator>
      </Drawer>
    </div>
    <div class="content-left hidden-ipad-and-down">
      <ArticleNavigator></ArticleNavigator>
    </div>
    <div class="content-right">
      <div class="content-right-header">
        <div class="content-right-header-title">
          <i class="icon-fanhui1" @click="goBack">返回</i>
          <a>{{ pageData.article.title }}</a>
        </div>
        <div class="content-right-header-time">
          <time>{{ formatISODate(pageData.article.create_time) }}</time>
          <div class="time-divide" style="">|</div>
          <time>{{ pageData.article.articleCategory_name }}</time>
        </div>
      </div>
      <div
        ref="articleDetailRef"
        class="article-preview"
        v-html="pageData.article.content"
      ></div>
      <!-- 图片预览 -->
      <el-image-viewer
        @close="closeModal"
        v-if="pageData.isModalVisible"
        :url-list="pageData.srcList"
        :initial-index="pageData.initialIndex"
      />
      <!-- 悬浮按钮 -->
      <button class="floating-button" @click="goBack">
        <i class="icon-fanhui1"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance, ref, onMounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { formatISODate } from "../utils/lmUtils";
import articleStore from "../store/article";
const { proxy } = getCurrentInstance();
const useArticleStore = articleStore();
const router = useRouter();

const articleDetailRef = ref(null);
const pageData = reactive({
  article: {
    id: null,
    title: "",
    create_time: "",
    articleCategory_name: "",
    content: "",
  },
  modalImageUrl: "",
  isModalVisible: false,
  srcList: [],
  initialIndex: 0,
});

// 返回文章列表
const goBack = () => {
  router.go(-1);
};

// 获取文章详情
const getArticleContent = async () => {
  const res = await proxy.$http.get(
    `/getArticleContent?id=${useRoute().query.id}`,
    pageData.query
  );
  pageData.article = res.data;
};

// 关闭图片预览的modal,并且让屏幕可以滚动
const closeModal = () => {
  pageData.isModalVisible = false;
  // 关闭预览允许屏幕滚动
  document.body.style.overflow = "";
};

onMounted(async () => {
  await getArticleContent();
  // 获取所有的<h?>标签
  const h1Tags = articleDetailRef.value.querySelectorAll("h1, h2, h3, h4, h5");
  // 遍历<h1>标签并提取文本
  const articleNavigators = Array.from(h1Tags).map((h1, index) => {
    const h1Id = `article_h1_${index}`;
    h1.id = h1Id;
    return {
      text: h1.textContent || h1.innerText,
      id: h1Id,
    };
  });
  // 打印文本
  useArticleStore.setArticleNavigators(articleNavigators);
  // 获取所有的图片使之可以预览
  const images = articleDetailRef.value.querySelectorAll("img");
  // 为每张图片添加双击事件监听器
  const preimgs = [];
  images.forEach((image, index) => {
    preimgs.push(image.src);
    image.addEventListener("click", (_event) => {
      // 获取图片URL
      const imageUrl = image.src;
      pageData.modalImageUrl = imageUrl;
      // 打开预览
      pageData.isModalVisible = true;
      // 设置预览默认打开的第几张图片
      pageData.initialIndex = index;
      // 预览图片时候禁止屏幕滚动
      document.body.style.overflow = "hidden";
    });
  });
  // v-html渲染好了再赋值给图片预览器
  nextTick(() => {
    pageData.srcList = preimgs;
  });
});
</script>

<style scoped lang="scss">
.floating-button {
  position: fixed; /* 固定定位 */
  bottom: 20px; /* 距离底部20像素 */
  left: 20px; /* 距离右侧20像素 */
  width: 50px; /* 宽度 */
  height: 50px; /* 高度 */
  background-color: #007bff; /* 背景颜色 */
  color: white; /* 文字颜色 */
  border: none; /* 无边框 */
  border-radius: 25px; /* 圆角 */
  cursor: pointer; /* 鼠标悬停时显示指针形状 */
  z-index: 999; /* 确保按钮在最上层 */
}
.floating-button:hover {
  background-color: #0056b3; /* 鼠标悬停时的背景颜色 */
}
.content {
  display: flex;
  width: 90%;
  margin: auto;
  padding: 20px 0;

  :deep() {
    .drawer {
      .main-card {
        border-radius: 0 !important;
      }
      .person {
        border-radius: 0 !important;
      }
    }
  }

  &-left {
    width: 266px;
  }

  @include respond-to("pc") {
    &-right {
      margin-left: 20px;
    }
  }
  @include respond-to("pc-x") {
    &-right {
      margin-left: 20px;
    }
  }
  &-right {
    min-height: 800px;
    border-radius: 5px;
    background: #fff;
    padding: 20px;
    &-header {
      text-align: center;
      color: #869896;

      > div {
        margin-top: 10px;
      }

      &-title {
        i {
          float: left;
          font-size: 1.2rem;
          color: var(--themecolor);
          cursor: pointer;
        }

        a {
          /* 防止内容撑大容器 */
          font-size: 1.3rem;
          transition: 0.3s;
        }
      }
      &-time {
        display: flex;
        justify-content: center;
        align-items: center;

        .time-divide {
          display: inline-block;
          font-size: 14.5px;
          line-height: 24px;
          margin-left: 3px;
          margin-right: 3px;
          opacity: 0.5;
          user-select: none;
        }
      }
    }
  }
}
.article-preview {
  margin-top: 20px;
  :deep() {
    img {
      max-width: 100%;
    }
    /* 为 <pre> 标签设置样式 */
    pre {
      /* 设定合适的宽度，以防止内容溢出 */
      max-width: 100%;
      overflow-x: auto; /* 如果内容超出宽度，则显示水平滚动条 */

      /* 设定合适的内边距和背景色 */
      padding: 1em;
      background-color: #f8f8f8; /* 浅灰色背景 */

      /* 设定字体和行高 */
      font-family: Consolas, Menlo, Monaco, "Courier New", monospace; /* 适用于代码的字体 */
      font-size: 14px;
      line-height: 1.5;

      /* 去除默认的边距 */
      margin: 0;

      /* 设定边框和圆角 */
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    /* 为 <code> 标签设置样式（通常 <code> 标签会嵌套在 <pre> 标签中）*/
    pre code {
      /* 如果不需要特殊的样式，这里可以留空 */
      /* 或者，你可以为嵌套在 <pre> 中的 <code> 标签添加额外的样式 */
      white-space: pre-wrap; /* 允许代码中的长字符串换行 */
      word-break: break-all; /* 防止单词内的换行 */
    }

    /* 如果你想要为单独的 <code> 标签（不在 <pre> 中）设置样式 */
    code {
      /* 设定字体和背景色 */
      font-family: Consolas, Menlo, Monaco, "Courier New", monospace;
      background-color: #f0f0f0; /* 浅灰色背景，与 <pre> 中的 <code> 略有不同 */

      /* 设定内边距和边框 */
      padding: 2px 4px;
      border-radius: 2px;

      /* 设定字体大小和颜色 */
      font-size: 0.9em;
      color: #333;
    }
  }
}
</style>
