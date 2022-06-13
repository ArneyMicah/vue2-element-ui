<style scoped>
    .el-table {
        margin-top: 10px;
    }
</style>
<template>
    <div class="rights">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="authName" label="权限名称" align="center">
            </el-table-column>
            <el-table-column prop="path" label="路径" align="center">
            </el-table-column>
            <el-table-column prop="level" label="权限等级" align="center">
                <template slot-scope="scope">
                    <el-tag v-show="scope.row.level == 0">一级</el-tag>
                    <el-tag type="success" v-show="scope.row.level == 1">二级</el-tag>
                    <el-tag type="warning" v-show="scope.row.level == 2">三级</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
            }
        },
        methods: {
            render(){
                this.$axios.get("rights/list").then(res => {
                    console.log(res);
                    this.tableData = res.data.data
                })
            }
        },
        created() {
            this.render()
        }
    }
</script>