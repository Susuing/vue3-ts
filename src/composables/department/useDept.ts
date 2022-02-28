import { ref } from 'vue'
import { AddDeptModel, DeptModel, ListParm } from "@/api/dept/DeptModel"
import { EditType } from '@/type/BaseEnum';
import useInstance from '@/hooks/useInstance';
import { addDeptApi, editDeptApi, deleteDeptApi } from '@/api/dept/dept';
import { Result, StatusCode } from '@/http/request';
export default function useDept(getDeptList,searchParm:ListParm) {
    const { global, proxy } = useInstance();
    const addDeptRef = ref<{ show: (type: string, row?: DeptModel) => void }>();

    const serachBtn = () => {
        getDeptList();
    }
    const resetBtn = () =>{
        searchParm.searchName = ''
        getDeptList();
    }
    const addBtn = () => {
        addDeptRef.value?.show(EditType.ADD);
    }
    const editBtn = (row: DeptModel) => {
        addDeptRef.value?.show(EditType.EDIT, row);
    }
    const deleteBtn = async (id: number) => {
        console.log(global)
        let parm = {
            id: id
        }
        const confirm = await global.$myconfirm('确定删除该数据吗?')
        if (confirm) {
            let res = await deleteDeptApi(parm)
            if (res && res.code == StatusCode.Success) {
                global.$message({ message: res.msg, type: 'success' })
                getDeptList();
            }
        }
    }
    const save = async (parm: AddDeptModel) => {
        let res: Result;
        if (parm.type == EditType.ADD) { 
            res = await addDeptApi(parm)
        } else {
            res = await editDeptApi(parm)
        }
        if (res && res.code == StatusCode.Success) {
            global.$message({ message: res.msg, type: 'success' })
            getDeptList();
        }
    }
    return {
        serachBtn,
        addBtn,
        editBtn,
        deleteBtn,
        save,
        addDeptRef,
        resetBtn
    }
}