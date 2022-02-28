import http from "@/http/http"
import { AddRoleModel, AssignSaveParm, AssignTreeParm, DeleteParm, RoleListParm } from "./RoleModel"
enum Api{
    getList = '/api/role/list',
    add = '/api/role',
    assignTree = '/api/role/getAssignPermissionTree',
    assignSave = '/api/role/roleAssignSave'
}

//角色列表
export const getRoleListApi = async(parm:RoleListParm) =>{
    return await http.get(Api.getList,parm)
}
//新增角色
export const addRoleApi = async(parm:AddRoleModel) =>{
    return await http.post(Api.add,parm)
}
//编辑角色
export const editRoleApi = async(parm:AddRoleModel) =>{
    return await http.put(Api.add,parm)
}
//删除角色
export const deleteRoleApi = async(parm:DeleteParm) =>{
    return await http.delete(Api.add,parm)
}
//分配权限树的数据
export const assignTreeApi = async(parm:AssignTreeParm) =>{
    return await http.get(Api.assignTree,parm)
}
//分配权限保存
export const assignSaveApi = async(parm:AssignSaveParm) =>{
    return await http.post(Api.assignSave,parm)
}