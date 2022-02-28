
import { AddDeptModel } from '@/api/dept/DeptModel'
import { reactive } from 'vue'
export default function useBaseModel() {
    //表单验证
    const rules = reactive({
        parentName: [
          {
            required: true,
            message: '请填写上级名称',
            trigger: 'blur',
          }
        ],
        deptCode: [
          {
            required: true,
            message: '请填写部门编码',
            trigger: 'blur',
          }
        ],
        deptAddress: [
          {
            required: true,
            message: '请填写部门地址',
            trigger: 'blur',
          }
        ],
        name: [
          {
            required: true,
            message: '请填写部门名称',
            trigger: 'blur',
          }
        ],
        deptPhone: [
          {
            required: true,
            message: '请填写部门电话',
            trigger: 'blur',
          }
        ],
        manager: [
          {
            required: true,
            message: '请填写部门经理',
            trigger: 'blur',
          }
        ],
        orderNum: [
          {
            required: true,
            message: '请填写部门序号',
            trigger: 'blur',
          }
        ]
      })

    //表单数据
    const dialogModel = reactive<AddDeptModel>({
        type: "",
        id: "",
        pid: "",
        parentName: "",
        manager: "",
        deptAddress: "",
        deptPhone: "",
        name: "",
        deptCode: "",
        orderNum: ""
    })


    return {
        rules,
        dialogModel
    }
}