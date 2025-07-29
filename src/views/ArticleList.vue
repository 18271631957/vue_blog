<template>
  <div class="content">
    <div class="hidden-pc-and-up">
      <Drawer v-model="useArticleStore.showDrawer">
        <PersonCard
          @itemClick="articleCategoryClick"
          :data="pageData.articleCategoryList"
        ></PersonCard>
      </Drawer>
    </div>
    <div class="content-left hidden-ipad-and-down">
      <PersonCard
        @itemClick="articleCategoryClick"
        :data="pageData.articleCategoryList"
      ></PersonCard>
    </div>

    <div class="content-right">
      <transition name="el-fade-in-linear">
        <div v-show="pageData.listShow">
          <div v-if="pageData.articleList.length > 0">
            <div class="content-right-list">
              <ArticleItem
                v-for="(item, index) in formatISODateComputed"
                @click="toDetail(item)"
                class="item"
                :article="item"
                :key="index"
              ></ArticleItem>
            </div>
            <div class="content-right-page">
              <el-pagination
                background
                layout="prev, pager, next"
                @update:current-page="handleCurrentPage"
                :page-size="pageData.query.page.pageSize"
                :total="pageData.total"
                hide-on-single-page
              />
            </div>
          </div>
          <el-empty v-else description="暂无" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { watch, computed, reactive, getCurrentInstance, onMounted } from "vue";
import router from "../router";
import articleStore from "../store/article";
import { formatISODate } from "../utils/lmUtils";
const useArticleStore = articleStore();
const { proxy } = getCurrentInstance();
const pageData = reactive({
  query: {
    page: {
      pageSize: 4,
      currentPage: 1,
    },
    queryParam: {
      articleCategory_id: null,
    },
  },
  total: 10,
  articleList: [],
  listShow: false,
});

const formatISODateComputed = computed(() => {
  return pageData.articleList.map((item) => {
    item.create_time = formatISODate(item.create_time);
    return item;
  });
});

// 改变当前页
const handleCurrentPage = (currentPage) => {
  pageData.query.page.currentPage = currentPage;
};
// 监听页数改变
watch(
  [
    () => pageData.query.page.currentPage,
    () => pageData.query.queryParam.articleCategory_id,
  ],
  (_newVal) => {
    getArticles();
  }
);
// 文章分类点击
const articleCategoryClick = async (item) => {
  if (item.id !== pageData.query.queryParam.articleCategory_id) {
    pageData.query.queryParam.articleCategory_id = item.id;
  }
};
// 获取文章
const getArticles = async () => {
  pageData.listShow = false;
  const getArticles = await proxy.$http.post("/getArticles", pageData.query);
  pageData.articleList = getArticles.data.rows;
  pageData.total = getArticles.data.count;
  pageData.listShow = true;
};

onMounted(async () => {
  getArticles();
  // 获取文章分类
  const getArticleCategorys = await proxy.$http.get("/getArticleCategorys");
  pageData.articleCategoryList = getArticleCategorys.data.rows;
});

const toDetail = (item) => {
  router.push({ path: "detail", query: { id: item.id } });
};
</script>

<style scoped lang="scss">
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
    flex: 1;
    min-height: 600px;
    &-list {
      .item {
        padding: 20px;
        background-color: #fff;
        margin-bottom: 20px;
        color: #525f7f;
        border-radius: 5px;
      }
    }
    &-page {
      display: flex;
      justify-content: center;
      margin-top: 40px;
      :deep() {
        .el-pagination.is-background .btn-next,
        .el-pagination.is-background .btn-prev,
        .el-pagination.is-background .el-pager li {
          background-color: #fff;
          color: #8898aa;
        }
        .btn-next,
        .btn-prev,
        .el-pager li {
          min-width: 43px;
          height: 43px;
          line-height: 43px;
          border-radius: 50%;
        }
        .el-pager li:hover {
          background: #dedede !important;
        }
        .el-pager li.is-active {
          background: var(--themecolor) !important;
          color: var(--base-text-color) !important;
        }
      }
    }
  }
}
</style>
