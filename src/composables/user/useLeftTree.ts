import { DeptModel, SelectNode } from '@/api/dept/DeptModel'
import { reactive, ref,onMounted,nextTick } from 'vue'
import { getLeftTreeApi } from '@/api/user/user'
import { ElTree } from 'element-plus';
export default function useLeftTree(emit) {

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
        children: 'children', 
        label: 'name', 
    })

    //树的点击事件
    const handleNodeClick = (data: DeptModel) => {
        console.log('点击了')
        selectNode.id = data.id;
        selectNode.name = data.name
        console.log(selectNode)
        emit('treeClick',data.id)
    }
    //获取树的数据
    const getTreeData = async () => {
        let res = await getLeftTreeApi();
        if (res && res.code == 200) {
            treeData.data = res.data;
            //处理默认选中第一个节点
            nextTick(() =>{
                const nodes = document.querySelector('.el-tree-node') as any;
                if(nodes){
                    nodes.click()
                }
            })
        }
    }

    onMounted(() =>{
        getTreeData();
    })
    //加号和减号的点击事件
    const openBtn = (data: DeptModel) => {
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