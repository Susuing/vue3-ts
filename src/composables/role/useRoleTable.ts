import { RoleListParm } from "@/api/role/RoleModel";
import { reactive,onMounted } from "vue";
import { getUserId } from "@/utils/auth";
import { getRoleListApi } from "@/api/role/role";
export default function useRoleTable(){
    //定义表格数据
    const roleTable = reactive({
        list:[]
    })

    //定义列表查询的参数
    const listParm = reactive<RoleListParm>({
        userId: getUserId() || '',
        currentPage:1,
        pageSize:10,
        name:'',
        total:0
    })

    //获取角色列表
    const getRoleList = async() =>{
        let res = await getRoleListApi(listParm)
        if(res && res.code == 200){
            console.log('数据返回')
            console.log(res)
            roleTable.list = res.data.records
            listParm.total = res.data.total;
        }
    }
    //页容量改变时触发
    const sizeChange = (size:number) =>{
        listParm.pageSize = size;
        getRoleList();
    }
    //页数改变时触发
    const currentChange = (page:number) =>{
        listParm.currentPage = page;
        getRoleList();
    }
    const searchBtn = () =>{
        getRoleList();
    }
    const resetBtn = () =>{
        listParm.name = '';
        getRoleList();
    }
    onMounted(() =>{
        getRoleList();
    })

    return{
        roleTable,
        listParm,
        getRoleList,
        sizeChange,
        currentChange,
        searchBtn,
        resetBtn
    }
}