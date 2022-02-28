import http from '@/http/http'
import { AddUserModel, AssignRoleListParm, LoginParm, LoginResult, SelectRoleParm, UserInfo, UserListParm } from './UserModel';
enum Api {
    getImg = '/api/sysUser/image',
    login = '/api/user/login',
    getInfo = '/api/sysUser/getInfo',
    getLeftTree = '/api/department/list',
    getUserList = '/api/user/list',
    addAndEdit = '/api/user',
    getRoleList = '/api/user/getRolistForAssign',
    getRoleId = '/api/user/getRoleIdByUserId',
    assignSave = '/api/user/assingRole',
    loginOut = '/api/sysUser/loginOut',
    restore = '/api/backup/restore'
}
//获取验证码
export async function getImagApi() {
    return await http.getImage(Api.getImg);
}
//登录
export async function loginApi(params: LoginParm) {
    console.log(params)
    return await http.login<LoginResult>(Api.login, params)
}
//获取用户信息
export const getInfoApi = async () => {
    return await http.get<UserInfo>(Api.getInfo)
}
//获取用户部门树
export const getLeftTreeApi = async () => {
    return await http.get(Api.getLeftTree)
}
//获取用户列表
export const getUserListApi = async (parm: UserListParm) => {
    return await http.get(Api.getUserList, parm)
}
//新增用户
export const addUserApi = async (parm: AddUserModel) => {
    return await http.post(Api.addAndEdit, parm)
}
//编辑用户
export const editUserApi = async (parm: AddUserModel) => {
    return await http.put(Api.addAndEdit, parm)
}
//删除用户
export const deleteUserApi = async (parm) => {
    return await http.delete(Api.addAndEdit, parm)
}
//获取分配角色弹框列表
export const getRoleListApi = async (parm: AssignRoleListParm) => {
    return await http.get(Api.getRoleList, parm)
}
//查询用户原来用有的角色id
export const getRoleIdApi = async (userId: number | string) => {
    return await http.getRestApi(Api.getRoleId, { userId: userId })
}
//分配角色保存
export const assingRoleSaveApi = async (parm: SelectRoleParm) => {
    return await http.post(Api.assignSave, parm)
}
//退出登录
export const loginOutApi = async (parm) => {
    return await http.post(Api.loginOut,parm)
}
//还原数据
export const restoreApi = async() =>{
    return await http.post(Api.restore,null)
}