import { SelectNode } from "@/api/dept/DeptModel";
import { EditType, Title } from "@/type/BaseEnum";
import { DialogModel } from "@/type/BastType"
import { ElForm } from "element-plus";
import { nextTick, ref } from 'vue'
import useInstance from "@/hooks/useInstance";
import { AddUserModel } from "@/api/user/UserModel";
export default function useUseAddAndEdit(dialog: DialogModel, onShow, onClose, addModel: AddUserModel, emit) {
    //获取全局属性
    const { global } = useInstance()

    //表单ref属性
    const addUserForm = ref<InstanceType<typeof ElForm>>();

    //弹框确定
    const confirm = () => {
        addUserForm.value?.validate(valid => {
            if (valid) {
                //把表单数据返回给父组件
                emit('save', addModel)
                //关闭弹框
                onClose();
            }
        })
    }
    //展示弹框
    const show = (type: string, row: AddUserModel) => {
        addModel.type = type;
        dialog.height = 230;
        //设置弹框的属性
        type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT;
        //显示弹框
        onShow();
        //清空表单
        global.$resetForm(addUserForm.value, addModel)
        //如果是编辑，要把编辑的数据复制到表单绑定的model里面
        if (type == EditType.EDIT) {
            nextTick(() => {
                global.$objCoppy(row, addModel)
                //设置是新增还是编辑
                addModel.type = type;
            })
        }
    }

    //选中上级的数据
    const select = (node: SelectNode) => {
        console.log('父组件取到值')

        addModel.deptId = node.id;
        addModel.deptName = node.name
        console.log(addModel)
    }
    return {
        confirm,
        show,
        addUserForm,
        select
    }
}