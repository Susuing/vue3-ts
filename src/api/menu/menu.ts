import http from '@/http/http'
import { AddMenuModel } from './MenuModel'
enum Api{
    getMenuList = '/api/sysUser/getMenuList',
    getTable = '/api/menu/list',
    getParent = '/api/menu/parent',
    add = '/api/menu'
}
//获取菜单
export const getMenuListApi = async() =>{
    return await http.get(Api.getMenuList)
}
//获取菜单列表
export const getMenuTableApi = async () =>{
    return await http.get(Api.getTable)
}
//获取上级菜单
export const getParentApi = async () =>{
    return await http.get(Api.getParent)
}
//新增
export const addMenuApi = async(parm:AddMenuModel) =>{
    return await http.post(Api.add,parm)
}
//编辑
export const editMenuApi = async(parm:AddMenuModel) =>{
    return await http.put(Api.add,parm)
}
//删除
export const deleteMenApi = async(id:number) =>{
    return await http.delete(Api.add,{id:id})
}