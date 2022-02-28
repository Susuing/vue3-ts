import { AddUserModel } from '@/api/user/UserModel';
import { Result } from '@/http/request';
import { EditType } from '@/type/BaseEnum';
import { ref } from 'vue'
import { addUserApi, editUserApi, deleteUserApi } from '@/api/user/user';
import useInstance from '@/hooks/useInstance';
export default function useUser(getUserList) {
    //分配角色组件的ref属性
    const assignRoleRef = ref<{show:(name:string,useId:string | number) =>void}>();
    //全局属性
    const { global } = useInstance()

    //新增弹框ref属性
    const userAddRef = ref<{ show: (type: string, row?: AddUserModel) => void }>();

    //新增
    const addBtn = () => {
        //显示弹框
        userAddRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: AddUserModel) => {
        //显示弹框
        userAddRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (id: number) => {
        let parm = {
            id: id
        }
        //信息提示
        let confirm = await global.$myconfirm('确定删除该数据吗?')
        if (confirm) {
            let res = await deleteUserApi(parm)
            if (res && res.code == 200) {
                global.$message({ message: res.msg, type: "success" })
                //刷新列表
                getUserList();
            }
        }
    }
    //分配角色
    const assignBtn = (row:AddUserModel) => {
        assignRoleRef.value?.show(row.loginName,row.id)
    }
    //新增、编辑保存
    const save = async (parm: AddUserModel) => {
        console.log('父组件接收到参数')
        console.log(parm)
        let res: Result;
        if (parm.type == EditType.ADD) {
            res = await addUserApi(parm)
        } else {
            res = await editUserApi(parm)
        }
        if (res && res.code == 200) {
            //刷新列表
            getUserList();
            //信息提示
            global.$message({ message: res.msg, type: 'success' })
        }
    }
    return {
        addBtn,
        editBtn,
        deleteBtn,
        assignBtn,
        userAddRef,
        save,
        assignRoleRef
    }
}