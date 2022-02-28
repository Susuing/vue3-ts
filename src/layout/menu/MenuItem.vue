<template>
    <template v-for="menu in menuList" :key="menu.path">
        <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
            <template #title>
                <i v-if="menu.meta.icon && menu.meta.icon.includes('el-icon')" :class="menu.meta.icon"></i>
                <!-- 动态组件的使用方法 -->
                <el-icon v-else>
                    <component  class="icons" :is="menu.meta.icon" />
                </el-icon>
                <!-- <Icon class="icons" v-else :icon='menu.meta.icon'></Icon> -->
                <span>{{ menu.meta.title }}</span>
            </template>
            <menu-item :menuList='menu.children'></menu-item>
        </el-sub-menu>
        <el-menu-item  style="color: #f4f4f5" v-else :index="menu.path">
            <i v-if="menu.meta.icon && menu.meta.icon.includes('el-icon')" :class="menu.meta.icon"></i>
                <!-- 动态组件的使用方法 -->
               <el-icon v-else>
                    <component  class="icons" :is="menu.meta.icon" />
                </el-icon>
                <!-- <Icon class="icons" v-else :icon='menu.meta.icon'></Icon> -->
            <template #title>{{ menu.meta.title }}</template>
        </el-menu-item>
    </template>
</template>
<script setup lang="ts">
defineProps(['menuList'])
</script>
<style scoped>
.icons{
    width: 24px;
    height: 18px;
    margin-right: 5px;
}
</style>