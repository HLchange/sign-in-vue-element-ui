<template>
    <div>
        <div class="login">
            <h3 class="f-w-n text-center fontsize-22 space-lt color-login">账号登录</h3>
            <el-form class="form" :rules="loginFormRules" ref="loginForm" :model="loginForm" status-icon>
                <el-form-item class="m-t-50" prop="loginName">
                    <el-input placeholder="请输入用户账号" v-model="loginForm.loginName"
                        prefix-icon="iconfont icon-yonghu color-login">
                    </el-input>
                </el-form-item>
                <el-form-item class="m-t-50" prop="loginPassword">
                    <el-input placeholder="请输入密码" v-model="loginForm.loginPassword" show-password
                        prefix-icon="iconfont icon-mima color-login">
                    </el-input>
                </el-form-item>
                <el-form-item class="m-t-50" prop="loginVercode">
                    <el-input placeholder="请输入验证码" v-model="loginForm.loginVercode"
                        prefix-icon="iconfont icon-yanzhengma color-login" style="width: 198px; "></el-input>
                    <!-- 验证码组件 -->
                    <ver-code @getcodehandler="getCode"></ver-code>
                </el-form-item>
                <br>
                <el-button type="primary" @click="loginSubmit('loginForm')" class="loginBtn fontsize-16 space-lt">登录
                </el-button>
            </el-form>
        </div>
        <footer class="footer">
            <p>Copyright(C)2022</p>
            <p>粤ICP备120035008</p>
            <p>公安备120035008</p>
        </footer>
    </div>
</template>

<script>
    import VerCode from "@/components/VerCode"
    export default {
        name: "login",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.loginPassword.length < 6 || this.loginPassword.length > 11) {
                        callback(new Error('长度在 6 到 11 个字符'));
                    }

                }
            };
            var validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    if (this.loginForm.loginVercode !== this.valCode) {
                        this.loginForm.loginVercode = ""
                        callback(new Error('验证码输入有误'));
                    }
                }
            };
            return {
                valCode: "",//用于接收从子组件返回的验证码
                loginForm: {
                    loginName: '',
                    loginPassword: '',
                    loginVercode: ''
                },
                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                loginFormRules: {
                    loginName: [
                        { required: true, message: '账号不可为空', trigger: 'blur' },
                        { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                    ],
                    loginPassword: [
                        { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' },
                        { required: true, message: '密码不可为空', trigger: 'blur' }
                    ],
                    loginVercode: [
                        { min: 4, message: '长度不少于4个字符', trigger: 'blur' },
                        { required: true, message: '验证码不可为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            getCode(code) {
                console.log(code)
                this.loginForm.loginVercode = this.valCode = code
            },
            loginSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.loginForm.loginName != "admin" || this.loginForm.loginPassword != "123456" || this.loginForm.loginVercode !== this.valCode) {
                            //只是为了做登录效果，所以账号密码写的固定的。
                            this.$message.error('账号密码不正确');
                            return false;
                        } else {//真正项目中登录成功之后，就可以用路由跳转页面
                            this.$router.push('/loginSuccess')
                            this.$message({
                                message: '登陆成功',
                                type: 'success',
                            });
                        }
                    } else {
                        this.$message.error('登录失败');
                        return false;
                    }
                });
            },
        },
        components: {
            "ver-code": VerCode
        },
    }

</script>
<style lang="less" scoped>

</style>