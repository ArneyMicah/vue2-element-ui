<style scoped>
    * {
        text-align: left;
    }

    .el-button {
        margin: 10px 0;
    }
</style>
<template>
    <div class="container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" @click="dialogVisible = true">添加分类</el-button>
        <zk-table class="tb-cate" index-text="序号" show-index stripe border :data="cateList" :columns="columns" :expand-type="false" :selection-type="false">
            <template slot="isok" slot-scope="scope">
                <i class="el-icon-success" v-if="!scope.row.cat_deleted" style="color: lightGreen"></i>
                <i class="el-icon-error" v-else style="color: red"></i>
            </template>
            <template slot="level" scope="scope">
                <el-tag type="primary" effect="plain" size="mini" v-show="scope.row.cat_level == 0">一级</el-tag>
                <el-tag type="success" effect="plain" size="mini" v-show="scope.row.cat_level == 1">二级</el-tag>
                <el-tag type="warning" effect="plain" size="mini" v-show="scope.row.cat_level == 2">三级</el-tag>
            </template>
            <template slot="opt" scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.cat_id)">删除</el-button>
            </template>
        </zk-table>
        <el-dialog title="添加参数" :visible.sync="dialogVisible" width="50%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="ruleForm.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类" prop="cat_pid">
                    <el-cascader v-model="idList" :options="allList" :props="{ value: 'cat_id', label: 'cat_name', checkStrictly: true }" clearable @change="change"></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="page.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="page.pagesize" layout="sizes, prev, pager, next" :total="total">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                page: {
                    type: [1, 2, 3],
                    pagenum: 1,
                    pagesize: 10,
                },
                total: 0,
                idList: [],
                cateList: [],
                allList: [],
                columns: [
                    { label: "分类名称", prop: "cat_name" },
                    {
                        label: "是否有效",
                        prop: "cat_deleted",
                        type: "template",
                        template: "isok",
                    },
                    {
                        label: "分类等级",
                        prop: "cat_level",
                        type: "template",
                        template: "level"
                    },
                    {
                        label: '操作',
                        type: 'template',
                        template: 'opt'
                    }
                ],
                ruleForm: {
                    cat_name: "",
                    cat_pid: "",
                    cat_level: "",
                },
                rules: {
                    cat_name: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            render() {
                this.$axios.get("categories").then(res => {
                    this.allList = res.data.data
                }),
                this.$axios.get("categories", {params: this.page,}).then(res => {
                    this.cateList = res.data.data.result
                    this.total = res.data.data.total;
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("categories", this.ruleForm).then(res => {
                            console.log(res);
                            if (res.data.meta.status == 201) {
                                this.$message({
                                    message: res.data.meta.msg,
                                    type: 'success'
                                });
                                this.dialogVisible = false;
                                this.render()
                                this.ruleForm.cat_name = "";
                                this.idList = [];
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            change() {
                if (this.idList.length == 0) {
                    this.ruleForm.cat_pid = 0;
                    this.ruleForm.cat_level = 0;
                } else if (this.idList.length == 1) {
                    this.ruleForm.cat_pid = this.idList[0]
                    this.ruleForm.cat_level = 1;
                } else if (this.idList.length == 2 || this.idList.length == 3) {
                    this.ruleForm.cat_pid = this.idList[1];
                    this.ruleForm.cat_level = 2;
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            sizeChange(val) {
                this.page.pagesize = val;
                this.render()

            },
            currentChange(val) {
                this.page.pagenum = val;
                this.render()
            },
            del(id){
                this.$axios.delete(`categories/${id}`).then(res => {
                    if (res.data.meta.status == 200){
                        this.$message({
                            message: res.data.meta.msg,
                            type: 'success'
                        });
                        this.render()
                    }
                })
            }
        },
        created() {
            this.render()
        }
    }
</script>