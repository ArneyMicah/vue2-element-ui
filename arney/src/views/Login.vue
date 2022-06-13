<template>
    <div class="login">
        <el-image style="width: 100px; height: 100px" :src="url"></el-image>
        <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input v-model="ruleForm.username" prefix-icon="el-icon-denglu3" style="font-size: 20px"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="ruleForm.password" prefix-icon="el-icon-mima1" style="font-size: 24px"></el-input>
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fit: [],
                url: 'https://s3.xoimg.com/i/2022/04/13/w2jzu2.png',
                ruleForm: {
                    username: "",
                    password: "",
                },
                rules: {
                    username: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("login", this.ruleForm).then(res => {
                            sessionStorage.setItem("token", res.data.data.token);
                            if (res.data.meta.status == 200) {
                                this.$message({
                                    message: res.data.meta.msg,
                                    type: 'success'
                                });
                                this.$router.push('/users')
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            document.body.style.backgroundColor = "#334b6c";
        },
    };
</script>

<style scoped>
    .login {
        width: 500px;
        height: 280px;
        margin: 100px auto;
        padding: 10px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 4px 0 #fff;
    }

    .el-input el-input--prefix {
        margin-top: 20px;
    }

    .el-form-item__content {
        width: 300px;
    }

    .el-form {
        position: relative;
        top: -20px;
    }

    .el-image {
        width: 200px;
        text-align: center;
        border: 6px solid #fff;
        position: flex;
        top: -15%;
        left: 50%;
        margin-left: -50px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0 5px #aaa;
    }
    .btn{
        text-align: center;
    }
    .el-input__icon{
        font-size: 20px;
    }
</style>