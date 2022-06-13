<style scoped>
    * {
        text-align: left;
    }

    .btn {
        margin: 15px 0;
    }
</style>
<template>
    <div class="roles">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" class="btn" @click="(dialogVisible = true), (title = '添加用户')">添加角色</el-button>
        <el-card class="box-card">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <p v-if="scope.row.children.length != 0">
                            <el-tag>{{scope.row.children[0].authName}}</el-tag>
                            <el-tag type="danger">{{scope.row.children[0].children[0].authName}}</el-tag>
                            <el-tag type="success" v-for="(item,i) in  scope.row.children[0].children[0].children" :key="i">{{item.authName}}</el-tag>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" align="center">
                </el-table-column>
                <el-table-column prop="roleDesc" label="角色描述" align="center">
                </el-table-column>
                <el-table-column label="操作" width="500" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
                        <el-button type="warning" icon="el-icon-s-tools" @click="set(scope.row)">修改权限
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="ruleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="活动描述" prop="roleDesc">
                    <el-input v-model="ruleForm.roleDesc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" v-show="title == '添加用户'">立即创建</el-button>
                    <el-button type="primary" @click="save" v-show="title == '修改用户'">立即修改</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="修改权限" :visible.sync="dialogTableVisible" width="50%">
            <el-tree :data="rights" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="getKey">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                dialogTableVisible: false,
                title: "",
                editId: "",
                rights: [],
                myId: "",
                defaultProps: {
                    children: 'children',
                    label: 'authName'
                },
                ruleForm: {
                    roleName: "",
                    roleDesc: "",
                },
                rules: {
                    roleName: [{
                            required: true,
                            message: "请输入角色名称",
                            trigger: "blur",
                        },
                        {
                            min: 1,
                            max: 100,
                            message: "长度在 1 到 100 个字符",
                            trigger: "blur",
                        },
                    ],
                    roleDesc: [{
                            required: true,
                            message: "请输入角色描述",
                            trigger: "blur",
                        },
                        {
                            min: 1,
                            max: 100,
                            message: "长度在 1 到 100 个字符",
                            trigger: "blur",
                        },
                    ],
                },
            };
        },
        methods: {
            render() {
                this.$axios.get("roles").then((res) => {
                    // console.log(res);
                    this.tableData = res.data.data;
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("roles", this.ruleForm).then((res) => {
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
                            this.dialogVisible = false;
                            this.render();
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            edit(item) {
                this.dialogVisible = true;
                this.title = "修改用户";
                this.ruleForm.roleName = item.roleName;
                this.ruleForm.roleDesc = item.roleDesc;
                this.editId = item.id;
            },
            save() {
                this.$axios
                    .put("roles/" + this.editId, this.ruleForm)
                    .then((res) => {
                        // console.log(res);
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
                        this.dialogVisible = false;
                        this.render();
                    });
            },
            del(id) {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .then(() => {
                        this.$axios.delete(`roles/${id}`).then((res) => {
                            if (res.data.meta.status == 200) {
                                this.$message({
                                    message: res.data.meta.msg,
                                    type: "success",
                                });
                                this.render();
                            } else {
                                this.$message({
                                    message: res.data.meta.msg,
                                    type: "danger",
                                });
                            }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除",
                        });
                    });
            },
            set(item) {
                this.dialogTableVisible = true;
                this.myId = item.id;
            },
            getRights() {
                this.$axios.get("rights/tree").then(res => {
                    console.log(res);
                    this.rights = res.data.data;
                })
            },
            getKey() {
                let arr = this.$refs.tree.getHalfCheckedKeys();
                let arr1 = this.$refs.tree.getCheckedKeys()
                this.$axios.post(`roles/${this.myId}/rights`, {
                    rids: [...arr, ...arr1].join(",")
                }).then(res => {
                    console.log(res);
                    if (res.data.meta.status == 200) {
                        this.$message({
                            message: res.data.meta.msg,
                            type: 'success'
                        });
                    }
                    this.dialogTableVisible = false
                    this.render()
                })
            },
        },
        created() {
            this.render();
            this.getRights();
        },
    };
</script>