<template>
  <div class="item">
    <!-- 文章头 -->
    <div class="item-header">
      <a style="">{{ article.title }}</a>
      <div class="header-time">
        <time>{{ article.create_time }}</time>
        <div class="time-divide">|</div>
        <time>{{ article.articleCategory_name }}</time>
      </div>
    </div>
    <!-- 文章简介 -->
    <!-- <div>
      $$f(x) = \begin{cases} x & \ x < 0, \\ 2x & \ x \geq 0. \end{cases}
      求函数的导数$$
    </div> -->
    <div class="item-content">
      {{ article.desc }}
    </div>
    <div class="item-footer">
      <i class="icon-24gf-tags2"></i>
      <a
        v-for="(item, index) in article.articleTags"
        :key="index"
        class="badge"
        >{{ item.name }}</a
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps } from "vue";
const props = defineProps({
  maskClick: Function,
  show: {
    type: Boolean,
    default: false, // 这里设置默认值
  },
  article: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  // MathJax.Hub.Typeset();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* 设置中等屏幕 */

.item {
  > div:not(:nth-child(1)) {
    margin-top: 10px;
  }
  &-footer {
    display: flex;
    flex-wrap: wrap;

    .badge {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 2px 5px;
      background-color: #eee;
      border-radius: 0.25rem;
      vertical-align: baseline;
      white-space: nowrap;
      // cursor: pointer;
      margin-right: 7px;
      margin-bottom: 7px;
    }

    .badge:first-of-type {
      margin-left: 7px;
    }

    .badge:hover {
      opacity: 0.7;
    }
  }
  &-header {
    text-align: center;
    color: #869896;

    > div {
      margin-top: 10px;
    }

    a {
      /* 防止内容撑大容器 */
      font-size: 1.3rem;
      transition: 0.3s;
      cursor: pointer;
    }

    a:hover {
      font-size: 1.4rem;

      /* 悬停时字体大小 */
    }

    .header-time {
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
  &-content {
    line-height: 1.5rem;
    max-height: 4.5rem;
    /* 3行的高度，每行高度1.5em */
    min-height: 4.5rem;
    /* 确保即使文本不足三行，也能撑开容器的高度 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
