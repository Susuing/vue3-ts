<template>
    <el-icon @click="changeIcon" class="fa-icons">
        <component :is="status ? Expand : Fold" />
    </el-icon>
</template>
<script setup lang='ts'>
import {computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons'
import { useStore } from '@/store/index'
const store = useStore()
const status = computed(()=>{
    // return store.getters['getCollapse']
    return store.getters['menu/getCollapse']
})
//图标切换
const changeIcon = ()=>{
    console.log(store)
    // store.commit('setCollapse',!status.value)
    store.commit('menu/setCollapse',!status.value)
}
</script>
<style scoped lang='scss'>
.fa-icons {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #303133;
    cursor: pointer;
    margin-right: 15px;
}
</style>