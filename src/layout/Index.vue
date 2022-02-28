<template>
    <el-container class="layout">
        <el-aside width="auto" class="asside">
            <MenuBar></MenuBar>
        </el-aside>
        <el-container>
            <el-header class="header">
                <Header></Header>
            </el-header>
            <el-main class="main">
                <Tabs style="padding:0px 20px;"></Tabs>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup lang="ts">
//setup语法糖中，引入的组件可以直接使用，无需再通过components进行注册
import Header from '@/layout/header/Header.vue';
import MenuBar from './menu/MenuBar.vue';
import Tabs from './tabs/Tabs.vue';
</script>
<style lang="scss" scoped>
.layout{
    height: 100%;
    .asside{
       background-color: #304156;
    }
    .header{
        height: 50px;
        border-bottom: 1px solid #e5e5e5;
        // background-color: blueviolet;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .main{
       padding-top: 0px;
       padding-left: 0px!important;
       padding-right: 0px!important;
    }
}
</style>