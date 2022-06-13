<style scoped>
    .inp {
        width: 500px;
        display: flex;
        align-items: center;
        margin: 10px 0;
    }
</style>
<template>
    <div class="goods">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="inp">
            <el-input placeholder="请输入内容" v-model="page.query" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-button type="primary" @click="add">添加按钮</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" align="center">
            </el-table-column>
            <el-table-column prop="goods_price" label="商品价格" align="center">
            </el-table-column>
            <el-table-column prop="goods_number" label="商品数量" align="center">
            </el-table-column>
            <el-table-column prop="add_time" label="创建时间" align="center">
                <template slot-scope="scope">
                    {{new Date(scope.row.add_time * 1000).toLocaleString()}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="del(scope.row.goods_id)" type="text">删除</el-button>
                    <el-button type="text">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                total: 0,
                page: {
                    query: "",
                    pagenum: 1,
                    pagesize: 10,
                },
            }
        },
        methods: {
            render() {
                this.$axios.get("goods", { params: this.page, }).then(res => {
                    console.log(res);
                    this.tableData = res.data.data.goods
                    this.total = res.data.data.total
                })
            },
            del(id) {
                this.$axios.delete(`goods/${id}`).then(res => {
                    console.log(res);
                    if (res.data.meta.status == 200) {
                        this.$message({
                            message: res.data.meta.msg,
                            type: 'success'
                        });
                        this.render()
                    } else {
                        this.$message({
                            message: res.data.meta.msg,
                            type: 'danger'
                        });
                    }
                })
            },
            sizeChange(val) {
                this.page.pagesize = val
                this.render();
            },
            currentChange(val) {
                this.page.pagenum = val
                this.render();
            },
            add() {
                this.$router.push({ path: '/add' })
            },
            search() {
                this.render()
                console.log(1);
            }
        },
        created() {
            this.render()
        }
    }
</script>