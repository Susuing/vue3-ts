import { createApp, createVNode } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store, key } from '@/store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { getToken,cleanSession } from './utils/auth'
import resetForm from './utils/resetForm'
import objCoppy from './utils/objCoppy'
import myconfirm from './utils/myconfirm'
import locale from 'element-plus/lib/locale/lang/zh-cn'
//引入echarts
import * as echarts from 'echarts'
//引入按钮权限
import { permission } from './directives/permission'
//引入图标
import * as Icons from '@element-plus/icons'
const app = createApp(App);
app.use(router).use(store, key).use(ElementPlus,{locale}).mount('#app')
//注册
app.directive('permission',permission)
//挂载工具
app.config.globalProperties.$resetForm = resetForm;
app.config.globalProperties.$objCoppy = objCoppy;
app.config.globalProperties.$myconfirm = myconfirm;
app.config.globalProperties.$echarts = echarts;
//方式一：
// typeof 和 keyof
const person = {
    name: '张三',
    age: 18
}
//typeof获取一个对象的类型
type tp = typeof person;
//keyof获取某种类型的所有键（key），返回的类型是一个联合类型
type keys = keyof tp;
//全局注册组件
Object.keys(Icons).forEach((key)=>{
    console.log(key)
    app.component(key,Icons[key as keyof typeof Icons])
    // app.component(key,Icons[key])
})
// 方式二
const Icon = (props: { icon: string }) => {
    const { icon } = props;
    return createVNode(Icons[icon as keyof typeof Icons]);
};
app.component('Icon', Icon);

//权限验证处理:全集守卫路由实现
const whiteList = ['/login']; //白名单
router.beforeEach(async(to,from,next) =>{
    //获取token
    let token = getToken();
    if(token){
        if(to.path === '/login' || to.path ==='/'){
            next({path:'/'})
        }else{
            //从vuex里面获取菜单
            let hasRoles = store.state.user.permissions && store.state.user.permissions.length > 0
            if(hasRoles){
                next()
            }else{
                try{
                    //vuex中不存在权限，从服务器获取
                    await store.dispatch('user/getInfo')
                    //获取菜单、动态生成路由
                    await store.dispatch('menu/getMenuList',router)
                    //确保动态添加的路由已经被完全加载上去
                    next({...to,replace:true})
                }catch(error){
                    //重置token
                    cleanSession();
                    //跳到登录
                    next({path:'/login'})
                }
            }
        }
    }else{
        //判断是否在白名单中
        if(whiteList.indexOf(to.path) !== -1){ //存在白名单，放行
            next(); 
        }else{ //不存在，登录
            next({path:'/login'})
        }
    }
})
