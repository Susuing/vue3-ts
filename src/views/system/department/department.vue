<template>
    <el-main height>
        <!-- 搜索栏 -->
        <el-form :model="searchParm" label-width="80px" :inline="true" size="mini">
            <el-form-item>
                <el-input v-model="searchParm.searchName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :icon="Search" size="mini" @click="serachBtn">搜索</el-button>
                <el-button style="color: #FF7670;" :icon="Close" size="mini" @click="resetBtn">重置</el-button>
                <el-button
                    v-permission="['sys:addDepartment']"
                    :icon="Plus"
                    size="mini"
                    type="primary"
                    @click="addBtn"
                >新增</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table
            :height="tableHeigth"
            :data="tableData.list"
            style="width: 100%"
            row-key="id"
            default-expand-all
            border
            :tree-props="{ children: 'children' }"
        >
            <el-table-column prop="name" label="部门名称" />
            <el-table-column prop="deptCode" label="部门编码" />
            <el-table-column prop="deptPhone" label="部门电话" />
            <el-table-column label="操作" width="200" align="center">
                <template #default="scope">
                    <el-button
                        v-permission="['sys:editDept']"
                        type="primary"
                        size="mini"
                        :icon="Edit"
                        @click="editBtn(scope.row)"
                    >编辑</el-button>
                    <el-button
                        v-permission="['sys:deleteDept']"
                        size="mini"
                        type="danger"
                        :icon="Close"
                        @click="deleteBtn((scope.row.id))"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-main>
    <!-- 新增、编辑弹框 -->
    <AddAndEdit ref="addDeptRef" @save="save"></AddAndEdit>
</template>
<script setup lang="ts">
import AddAndEdit from './AddAndEdit.vue';
import { Search, Plus, Edit, Close } from '@element-plus/icons'
import useDepaTable from '@/composables/department/useDeptTable';
import useDept from '@/composables/department/useDept';

//表格列表
const { searchParm, tableData, getDeptList, tableHeigth } = useDepaTable();


//表格操作  搜索、新增、编辑、删除
const { serachBtn, addBtn, editBtn, deleteBtn, addDeptRef, save, resetBtn } = useDept(getDeptList, searchParm);
</script>