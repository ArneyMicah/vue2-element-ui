<style scoped>
    .inp {
        width: 500px;
        display: flex;
        align-items: center;
        margin: 10px 0;
    }
</style>
<template>
    <div class="user">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="inp">
            <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="primary" @click="(dialogVisible = true), (title = '添加用户')">添加按钮</el-button>
        </div>
        <el-card class="box-card">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="username" label="用户名" align="center">
                </el-table-column>
                <el-table-column prop="mobile" label="电话" align="center">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" align="center">
                </el-table-column>
                <el-table-column prop="role_name" label="角色" align="center">
                </el-table-column>
                <el-table-column prop="mg_state" label="状态" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" @change="change(scope.row.id, scope.row.mg_state)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="text" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" :disabled="title == '编辑用户'"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-show="title == '添加用户'">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" v-show="title == '添加用户'">立即创建</el-button>
                    <el-button type="primary" @click="save" v-show="title == '编辑用户'">立即修改</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                input: "",
                tableData: [],
                dialogVisible: false,
                title: "",
                editId: "",
                total: 0,
                page: {
                    query: "",
                    pagenum: 1,
                    pagesize: 10,
                },
                ruleForm: {
                    username: "",
                    password: "",
                    mobile: "",
                    email: "",
                },
                rules: {
                    username: [{
                            required: true,
                            message: "请输入用户名",
                            trigger: "blur",
                        },
                        {
                            min: 1,
                            max: 100,
                            message: "长度在 1 到 100 个字符",
                            trigger: "blur",
                        },
                    ],
                    password: [{
                            required: true,
                            message: "请输入密码",
                            trigger: "blur"
                        },
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1 到 20 个字符",
                            trigger: "blur",
                        },
                    ],
                    mobile: [{
                            required: true,
                            message: "请输入电话",
                            trigger: "blur"
                        },
                        {
                            min: 1,
                            max: 11,
                            message: "长度在 1 到 11 个字符",
                            trigger: "blur",
                        },
                    ],
                    email: [{
                            required: true,
                            message: "请输入邮箱",
                            trigger: "blur"
                        },
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1 到 20 个字符",
                            trigger: "blur",
                        },
                    ],
                },
            };
        },
        methods: {
            render() {
                this.$axios.get("users", {
                    params: this.page
                }).then((res) => {
                    this.tableData = res.data.data.users;
                    this.total = res.data.data.total;
                });
            },
            change(id, type) {
                this.$axios.put(`users/${id}/state/${type}`).then((res) => {
                    if (res.data.meta.status == 200) {
                        this.$message({
                            message: res.data.meta.msg,
                            type: "success",
                        });
                    } else {
                        this.$message({
                            message: res.data.meta.msg,
                            type: "danger",
                        });
                    }
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("users", this.ruleForm).then((res) => {
                            console.log(res);
                            if (res.data.meta.status == 200) {
                                this.$message({
                                    message: res.data.meta.msg,
                                    type: "success",
                                });
                            } else {
                                this.$message({
                                    message: res.data.meta.msg,
                                    type: "danger",
                                });
                            }
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                    this.dialogVisible = false;
                    this.render();
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            del(id) {
                this.$axios.delete(`users/${id}`).then((res) => {
                    console.log(res);
                    if (res.data.meta.status == 200) {
                        this.$message({
                            message: res.data.meta.msg,
                            type: "success",
                        });
                    } else {
                        this.$message({
                            message: res.data.meta.msg,
                            type: "danger",
                        });
                    }
                    this.render();
                });
            },
            edit(item) {
                this.dialogVisible = true;
                this.title = "编辑用户";
                this.ruleForm.username = item.username;
                this.ruleForm.mobile = item.mobile;
                this.ruleForm.email = item.email;
                this.editId = item.id;
            },
            save() {
                this.$axios
                    .put("users/" + this.editId, this.ruleForm)
                    .then((res) => {
                        console.log(res);
                        if (res.data.meta.status == 200) {
                            this.$message({
                                message: res.data.meta.msg,
                                type: "success",
                            });
                            this.dialogVisible = false;
                            this.render();
                        } else {
                            this.$message({
                                message: res.data.meta.msg,
                                type: "danger",
                            });
                        }
                    });
            },
            sizeChange(val) {
                this.page.pagesize = val
                this.render();
            },
            currentChange(val) {
                this.page.pagenum = val
                this.render();
            }
        },
        created() {
            this.render();
        },
    };
</script>