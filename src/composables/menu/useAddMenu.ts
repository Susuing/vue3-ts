import { EditType, Title } from "@/type/BaseEnum";
import { DialogModel } from "@/type/BastType"
import { AddMenuModel, MenuModel } from "@/api/menu/MenuModel";
import { SelectNode } from "@/api/dept/DeptModel";
import { nextTick, reactive, ref } from "vue";
import { ElForm } from "element-plus";
import useInstance from "@/hooks/useInstance";
export default function useAddMenu(dialog: DialogModel, onClose, onShow, emit) {
    const { global } = useInstance()
    //表单的ref属性
    const addMenuForm = ref<InstanceType<typeof ElForm>>();
    //表单验证规则
    const rules = reactive({
        type: [
            {
                required: true,
                trigger: "change",
                message: "请选择菜单类型",
            },
        ],
        parentName: [
            {
                required: true,
                trigger: "change",
                message: "请选择上级菜单",
            },
        ],
        label: [
            {
                required: true,
                trigger: "change",
                message: "请填写菜单名称",
            },
        ],
        name: [
            {
                required: true,
                trigger: "change",
                message: "请填写路由名称",
            },
        ],
        path: [
            {
                required: true,
                trigger: "change",
                message: "请填写路由路径",
            },
        ],
        url: [
            {
                required: true,
                trigger: "change",
                message: "请填写组件路径",
            },
        ],
        code: [
            {
                required: true,
                trigger: "change",
                message: "请填写权限字段",
            },
        ],
        icon: [
            {
                required: true,
                trigger: "change",
                message: "请填写图标",
            },
        ]
    })
    //定义表单绑定的数据
    const addMenuModel = reactive<AddMenuModel>({
        id: '',
        editType: '',
        type: '',
        parentId: '',
        parentName: '',
        label: '',
        icon: '',
        name: '',
        path: '',
        url: '',
        code: '',
        orderNum: '',
    })
    //确定
    const confrim = () => {

        addMenuForm.value?.validate(valid => {
            if (valid) {
                emit('save', addMenuModel)
                //弹框关闭
                onClose();
            }
        })
    }
    //展示弹框
    const show = (type: string, row: MenuModel) => {
        //设置弹框属性
        type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT;
        onShow();
        //清空表单
        global.$resetForm(addMenuForm.value, addMenuModel)
        if (type == EditType.EDIT) {
            nextTick(() => {
                //把当前要编辑的行数据复制到表单绑定的数据里面
                global.$objCoppy(row, addMenuModel)
            })
        }
        //设置编辑的属性
        addMenuModel.editType = type
    }
    //选中上级的数据
    const select = (node: SelectNode) => {
        console.log('父组件取到值')
        console.log(node)
        addMenuModel.parentId = node.id;
        addMenuModel.parentName = node.name
    }
    return {
        confrim,
        show,
        addMenuModel,
        rules,
        addMenuForm,
        select
    }
}