<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    {{ message }}
  </div>
</template>

<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
import { ref, reactive, computed, watch } from "vue";
//数据
const message = "uniapp blog";
/*
    const logMessage = () => {
      console.log(message)
    }
    //响应式数据  引发视图更新
    const state = reactive({
      reactiveCount: 0
    })
    const setReactiveCount = () => {
      state.reactiveCount++
    }
    // ref响应式数据  简单对象用
    const refCount = ref(0)
    const setRefCount = () => {
      refCount.value++
    }
    // computed使用(只读) 只做计算,不要做其他事情比如修改 响应式数据,修改dom
    const numArray = ref([1, 2, 3, 4, 5, 6, 7, 8])
    const numArrayComputed = computed(() => {
      return numArray.value.filter(item => item > 2)
    })
    setTimeout(() => {
      numArray.value.push(9, 10)
    }, 3000)
    // watch 监听count1变化 ref对象不需要加.value
    watch(refCount, (newValue, oldValue) => {
      console.log(`新${newValue},旧${oldValue}`)
    })
    const name = ref('huangzhao')
    watch([refCount, name], ([newRefCount, newName], [oldRefCount, oldName]) => {
      console.log(`新${[newRefCount, newName]},旧${[oldRefCount, oldName]}`)
    })*/
</script>
