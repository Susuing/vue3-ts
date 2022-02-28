const addMenuRef = ref<{ show: (type: string, row?: MenuModel) => void }>();
import { AddMenuModel, MenuModel } from "@/api/menu/MenuModel";
import { Result } from "@/http/request";
import { EditType } from "@/type/BaseEnum";
import { addMenuApi, editMenuApi, deleteMenApi } from "@/api/menu/menu";
import { ref } from "vue"
import useInstance from "@/hooks/useInstance";
export default function useMenu(getMenuTable) {
    const { global } = useInstance()

    //弹框的ref属性
    const addMenuRef = ref<{ show: (type: string, row?: MenuModel) => void }>();
    //新增
    const addBtn = () => {
        addMenuRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: MenuModel) => {
        addMenuRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (id: number) => {
        //信息确定
        let confrim = await global.$myconfirm('确定删除该数据吗?')
        if (confrim) {
            let res = await deleteMenApi(id);
            if (res && res.code == 200) {
                //信息提示
                global.$message({ message: res.msg, type: 'success' })
                //刷新表格
                getMenuTable();
            }
        }
    }
    //保存
    const save = async (parm: AddMenuModel) => {
        console.log('父组件接收值')
        console.log(parm)
        let res: Result;
        if (parm.editType == EditType.ADD) {
            res = await addMenuApi(parm)
        } else {
            res = await editMenuApi(parm)
        }
        if (res && res.code == 200) {
            //信息提示
            global.$message({ message: res.msg, type: 'success' })
            //刷新表格
            getMenuTable();
        }
    }
    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        addMenuRef
    }
}