import { AddRoleModel } from "@/api/role/RoleModel";
import { EditType, Title } from "@/type/BaseEnum";
import { DialogModel } from "@/type/BastType"
import { ElForm } from "element-plus";
import { nextTick, reactive, ref } from "vue";
import useInstance from "@/hooks/useInstance";
export default function useAddRole(dialog: DialogModel, onClose, onShow, emit) {
    //获取全局属性
    const { global } = useInstance()
    //表单的ref属性
    const addRoleForm = ref<InstanceType<typeof ElForm>>()
    //表单绑定的数据
    const addModel = reactive<AddRoleModel>({
        id: '',
        name: '',
        createUser: '',
        type: '',
        remark: ''
    })
    //表单验证规则
    const rules = reactive({
        name: [{
            trigger: 'change',
            required: true,
            message: '请填写角色名称'
        }]
    })
    //确定
    const confirm = () => {
        addRoleForm.value?.validate(valid => {
            if (valid) {
                console.log('表单验证通过')
                console.log(addModel)
                emit('save', addModel)
                onClose();
            }
        })
    }
    //显示弹框 type : 0 和 1
    const show = (type: string, row: AddRoleModel) => {
        //设置弹框的高度
        dialog.height = 180;
        //设置弹框的标题
        type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
        //显示弹框
        onShow();
        //清空表单
        global.$resetForm(addRoleForm.value, addModel)
        if (type == EditType.EDIT) {
            nextTick(() => {
                //如果是编辑，复制当前行到表单绑定的数据
                global.$objCoppy(row, addModel)
            })
        }
        //设置编辑属性
        addModel.type = type;
    }
    return {
        confirm,
        show,
        addModel,
        rules,
        addRoleForm
    }
}