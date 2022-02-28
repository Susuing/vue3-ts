import { UserListParm } from '@/api/user/UserModel'
import {reactive} from 'vue'
import { getUserListApi } from '@/api/user/user'
export default function useUserTable(){
    //定义表格绑定的数据
    const tableData = reactive({
        list:[]
    })

    //表格查询的参数
    const listParm = reactive<UserListParm>({
        deptId:'',
        pageSize:10,
        currentPage:1,
        total:0,
        loginName:''
    })

    //查询表格
    const getUserList = async() =>{
        let res = await getUserListApi(listParm)
        console.log('表格加载完成')
        console.log(res)
        if(res && res.code == 200){
            //把返回的数据设置到表格绑定的数据里面
            tableData.list = res.data.records
            //设置分页总条数
            listParm.total = res.data.total;
        }
    }
    //树组件调用，查询用户列表
    const treeClick = async(deptId:number) =>{
        //设置部门Id
        listParm.deptId = deptId
        getUserList();
    }

    //页容量改变时触发
    const sizeChange = (size:number) =>{
        listParm.pageSize = size;
        getUserList();
    }

    //页数改变时触发
    const currentChange = (page:number) =>{
        listParm.currentPage = page;
        getUserList();
    }
    //搜索
    const searchBtn = () =>{
        getUserList();
    }
    //重置
    const resetBtn = () =>{
        listParm.loginName = '';
        getUserList();
    }
    return {
        tableData,
        listParm,
        getUserList,
        treeClick,
        sizeChange,
        currentChange,
        searchBtn,
        resetBtn
    }
}