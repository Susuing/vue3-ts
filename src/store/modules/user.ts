import { loginApi, getInfoApi } from "@/api/user/user"
import { LoginParm } from "@/api/user/UserModel"
import { Result } from "@/http/request"
import { ActionContext } from "vuex"
import { RootState } from "../index"
import { setUserId, setToken, setExpireTime } from "@/utils/auth"
//定义state类型
export type UserState = {
    token: string,
    userId: string,
    permissions: string[]
}
//定义state
export const state: UserState = {
    token: '',
    userId: '',
    permissions: []
}
//定义mutations
export const mutations = {
    setToken(state: UserState, token: string) {
        state.token = token
    },
    setUserId(state: UserState, userId: string) {
        state.userId = userId
    },
    setRoles(state: UserState, roles: string[]) {
        state.permissions = roles;
    }
}
//定义actions
export const actions = {
    //获取用户信息
    getInfo({ commit }: ActionContext<UserState, RootState>) {
        return new Promise((resolve, reject) => {
            getInfoApi().then(res => {
                //设置权限信息到vuex里面
                if (res.code == 200) {
                    commit('setRoles', res.data.roles)
                }
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //登录
    login({ commit }: ActionContext<UserState, RootState>, loginParm: LoginParm) {
        return new Promise<Result>((resolve, reject) => {
            loginApi(loginParm).then(res => {
                //把返回的token放到vuex里面 和 cookies(sessioStorage)
                if (res.data.code == 200) {
                    commit('setToken', res.data.token)
                    commit('setUserId', res.data.id)
                    //存到cookies ==> sessioStorage
                    setUserId(res.data.id)
                    setToken(res.data.token)
                    setExpireTime(res.data.expireTime)
                }
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
//定义getters
export const getters = {
    //获取用户的权限字段
    getPermissions(state: UserState) {
        return state.permissions
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
