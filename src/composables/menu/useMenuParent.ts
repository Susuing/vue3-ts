import { SelectNode } from '@/api/dept/DeptModel'
import { MenuModel } from '@/api/menu/MenuModel';
import { reactive, ref } from 'vue'
import { getParentApi } from '@/api/menu/menu';
import { ElTree } from 'element-plus';
export default function useMenuParent() {
    //树的ref属性
    const parentTree = ref<InstanceType<typeof ElTree>>();
    //上级树的数据
    const treeData = reactive({
        data: []
    })
    //选中的数据
    const selectNode = reactive<SelectNode>({
        id: '',
        name: ''
    })
    //树的属性
    const defaultProps = reactive({
        children: 'children', //设置树的children
        label: 'label', //设置树的名字属性字段
    })

    //树的点击事件
    const handleNodeClick = (data: MenuModel) => {
        console.log(data)
        selectNode.id = data.id;
        selectNode.name = data.label
        console.log(selectNode)
    }
    //获取树的数据
    const getTreeData = async () => {
        let res = await getParentApi();
        if (res && res.code == 200) {
            treeData.data = res.data;
        }
    }


    //加号和减号的点击事件
    const openBtn = (data: MenuModel) => {
        console.log(data)
        //设置展开或者关闭
        data.open = !data.open;
        if (parentTree.value) {
            parentTree.value.store.nodesMap[data.id].expanded = !data.open;
        }
    }
    return {
        treeData,
        defaultProps,
        handleNodeClick,
        getTreeData,
        openBtn,
        parentTree,
        selectNode
    }
}