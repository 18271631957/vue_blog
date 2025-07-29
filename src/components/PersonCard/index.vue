<template>
  <div class="main-card">
    <div class="person">
      <span class="introduce">寤寐思服</span>
      <span class="desc">初心易得，始终难守</span>
    </div>
    <div class="catagory">
      <ul>
        <li
          v-for="(item, index) in addArticleCategory"
          @click="handleItemClick(item, index)"
          class="catagory-item"
          :class="{ 'is-active': activeIndex == index }"
          :key="index"
        >
          <i class="icon-shouye"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import articleStore from "../../store/article";
const useArticleStore = articleStore();
const props = defineProps({
  itemClick: Function,
  data: {
    type: Array,
    default: () => [], // 这里设置默认值
  },
});
const emit = defineEmits(["itemClick"]);

//用于存储当前选中的种类索引
const activeIndex = ref(0);

/*
在文章种类中添加一个全部选项
*/
const addArticleCategory = computed(() => {
  const categorys = [
    {
      id: null,
      name: "全部",
    },
    ...props.data,
  ];
  return categorys;
});
/*
文章种类单击后
1.要按种类查询文章列表
2.要改变当前选中的种类
3.要关闭抽屉
*/
const handleItemClick = (item, index) => {
  emit("itemClick", item);
  activeIndex.value = index;
  useArticleStore.setShowDrawer(false);
};
</script>

<style scoped lang="scss">
.main-card {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: relative;

  .person {
    background: linear-gradient(
      150deg,
      var(--themecolor-light) 15%,
      var(--themecolor) 70%,
      var(--themecolor-dark0) 94%
    );
    color: #fff;
    padding: 30px 50px;
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

    .catagory-item {
      height: 2.2rem;
      line-height: 2.2rem;
      margin: 0 5px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;
      span {
        letter-spacing: 0px;
        text-align: center;
        margin-left: 3px;
        font-weight: 500;
      }
    }
    .catagory-item.is-active {
      background: color-mix(in srgb, var(--base-background-color) 22%, white);
      color: var(--themecolor);
    }
    .catagory-item:not(.is-active):hover {
      opacity: 0.3;
      background: rgba(10, 0, 0, 0.1);
    }
  }
}
</style>
