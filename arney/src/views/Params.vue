<style scoped>
    * {
        text-align: left;
    }
</style>
<template>
    <div class="params">
        <el-alert title="警告提示的文案" type="warning" center>
        </el-alert>
        <p>
            选择商品分类:
            <el-cascader v-model="idList" :options="allCate" @change="handleChange" :props="{value: 'cat_id', label: 'cat_name'}">
            </el-cascader>
        </p>
        <el-button type="primary" @click="dialogVisible = true">添加分类</el-button>
        <el-tabs>
            <el-tab-pane label="动态参数" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="静态属性" name="second">配置管理</el-tab-pane>
        </el-tabs>
        <el-table :data="paraList" border style="width: 100%">
            <el-table-column prop="attr_name" label="参数名称" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="del(scope.row.cat_id, scope.row.attr_id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加参数" :visible.sync="dialogVisible" width="50%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="参数名称">
                    <el-input v-model="form.attr_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                allCate: [],
                idList: [],
                paraList: [],
                form: {
                    attr_name: "",
                    attr_sel:"many",
                },
                dialogVisible: false,
            }
        },
        methods: {
            render() {
                this.$axios.get("categories").then(res => {
                    console.log(res);
                    this.allCate = res.data.data;
                })
            },
            Para() {
                this.$axios.get(`categories/${this.idList[2]}/attributes`, { params: { sel: "many" } }).then(res => {
                    console.log(res);
                    this.paraList = res.data.data;
                })
            },
            handleChange(val) {
                console.log(val);
                if (val.length != 3) {
                    this.$message({
                        message: '只允许为三级分类设置参数',
                        type: 'error'
                    });
                    this.idList = []
                } else {
                    this.Para()
                }
            },
            onSubmit() {
                this.$axios.post(`categories/${this.idList[2]}/attributes`, this.form).then(res => {
                    console.log(res);
                    if (res.data.meta.status == 201) {
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        });
                        this.dialogVisible = false;
                        this.Para();
                    } else {
                        this.$message({
                            message: res.data.meta.msg,
                            type: 'error'
                        });
                    }
                })
            },
            del(id, attrid){
                this.$axios.delete(`categories/${id}/attributes/${attrid}`).then(res => {
                    console.log(res);
                    if (res.data.meta.status == 200){
                        this.$message({
                            message: res.data.meta.msg,
                            type: 'success'
                        });
                        this.Para();
                    }
                })
            }
        },
        created() {
            this.render();
        }
    }
</script>