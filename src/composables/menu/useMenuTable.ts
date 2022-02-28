import { reactive,onMounted } from "vue"
import { getMenuTableApi } from "@/api/menu/menu"
export default function useMenuTable(){
    //表格数据
    const menuTable = reactive({
        list:[]
    })

    //获取表格数据
    const getMenuTable = async() =>{
        let res = await getMenuTableApi();
        if(res && res.code == 200){
            //设置表格数据
            menuTable.list = res.data;
        }
    }

    onMounted(() =>{
        getMenuTable()
    })
    return{
        menuTable,
        getMenuTable
    }
}