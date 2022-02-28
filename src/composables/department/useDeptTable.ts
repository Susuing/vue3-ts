/**
 * 表格列表的业务逻辑
 */
import { reactive, onMounted, ref, nextTick } from 'vue'
import { DeptListRes, ListParm } from "@/api/dept/DeptModel"
import { getDeptListApi } from '@/api/dept/dept'
export default function useDepaTable() {
    //表格的高度
    const tableHeigth = ref(0);

    const searchParm = reactive<ListParm>({
        searchName: ''
    })
    const tableData = reactive<DeptListRes>({
        list: []
    })
    //获取表格数据
    const getDeptList = async () => {
        let res = await getDeptListApi(searchParm);
        if (res && res.code == 200) {
            console.log('加载表格数据')
            console.log(res.data)
            tableData.list = res.data;
        }
    }
    onMounted(() => {
        getDeptList();
        nextTick(() => {
            tableHeigth.value = window.innerHeight - 200
        })
    })
    return {
        searchParm,
        tableData,
        getDeptList,
        tableHeigth
    }
}