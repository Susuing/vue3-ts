<template>
    <div class="logincontainer">
        <el-form
            class="loginForm"
            :model="loginModel"
            ref="loginFormRef"
            :rules="rules"
            :inline="false"
            size="large"
        >
            <div class="loginTitle">系统登录</div>
            <el-form-item prop="username">
                <el-input placeholder="请输入账户" v-model="loginModel.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="loginModel.password"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-input placeholder="请输入验证码" v-model="loginModel.code"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <!-- <el-input placeholder="请输入验证码" v-model="loginModel.code"></el-input> -->
                        <img class="image" :src="imgSrc" @click="getImage" />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="20" style="margin-top: 10px;width: 100%;">
                    <el-col :span="12">
                        <el-button class="mybtn"  @click="login" type="primary" size="large">登录</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button class="mybtn" size="large">取消</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang='ts'>
import useImage from '@/composables/login/useImage';
import useBaseLogin from '@/composables/login/useBaseLogin';
import useLogin from '@/composables/login/useLogin';
//基础数据
const { loginModel, rules, loginFormRef } = useBaseLogin();

//验证码
const { imgSrc, getImage } = useImage();

//登录
const { login } = useLogin(loginModel);


</script>
<style scoped lang='scss'>
.logincontainer {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(@/assets/background.jpg) no-repeat center 0px;
    .loginForm {
        width: 400px;
        height: 320px;
        border-radius: 10px;
        box-shadow: 0 0 25px #cac6c6;
        padding: 20px 35px;
        background-color: rgba($color: #fff, $alpha: .6);
        
        .loginTitle {
            font-size: 24px;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 18px !important;
        }
        .image {
            width: 100%;
            height: 40p!important;
        }
        .mybtn {
            width: 100%;
        }
    }
}
::v-deep .el-row {
    width: 100% !important;
}
</style>