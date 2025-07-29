<template>
  <div class="main-card">
    <div class="person">
      <span class="introduce">本文导航</span>
    </div>
    <div class="catagory">
      <ul>
        <li
          v-for="(item, index) in useArticleStore.articleNavigators"
          @click="toAnchor(item)"
          :key="index"
        >
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import articleStore from "@/store/article";
const useArticleStore = articleStore();

const toAnchor = (item) => {
  // 关闭抽屉
  useArticleStore.setShowDrawer(false);
  const h1Elements = document.querySelectorAll(`#${item.id}`);
  //console.log(h1Elements);
  const h1Element = h1Elements[0];
  /* 
  //此方法无法精确定位到离锚点处60px 故注释
  h1Element.scrollIntoView({ behavior: "smooth" });
  */
  // 获取元素相对于视口顶部的位置（包括滚动偏移）
  var rect = h1Element.getBoundingClientRect();
  var elementTop = rect.top + window.pageYOffset; // 元素相对于文档顶部的位置

  // 计算需要滚动到的位置（距离视口顶部 60px）
  var scrollToPosition = elementTop - 60;

  // 确保滚动位置不会低于页面的顶部
  scrollToPosition = Math.max(0, scrollToPosition);

  // 滚动到指定位置
  window.scrollTo({
    top: scrollToPosition,
    behavior: "smooth", // 可选：平滑滚动
  });
};
</script>

<style scoped lang="scss">
.main-card {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: relative;

  .person {
    background: linear-gradient(87deg, #2dce89 0, #2dcecc 100%);
    color: #fff;
    padding: 10px 20px;
    text-align: center;
    border-radius: 5px 5px 0 0;

    .introduce {
      display: block;
      font-size: 1.3rem;
    }

    .desc {
      display: block;
      margin-top: 14px;
    }
  }

  .catagory {
    background-color: #fff !important;
    border-radius: 0 0 5px 5px;

    ul {
      list-style-type: none;
      padding: 10px 0;
    }

    li {
      margin: 0 5px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      span {
        letter-spacing: 0px;
        text-align: center;
        margin-left: 3px;
        font-weight: 500;
        line-height: 2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    li:hover {
      cursor: pointer;
      opacity: 0.3;
      background: rgba(10, 0, 0, 0.1);
    }
  }
}
</style>
