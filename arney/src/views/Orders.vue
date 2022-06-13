<style scoped>

</style>
<template>
    <div class="orders">
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="page.query" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="order_number" label="订单编号" align="center">
            </el-table-column>
            <el-table-column prop="order_pay" label="是否付款" align="center">
                <template slot-scope="scope">
                    <el-tag type="success" v-show="scope.row.order_pay == 0">已付款</el-tag>
                    <el-tag type="danger" v-show="scope.row.order_pay == 1">未付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货" align="center">
            </el-table-column>
            <el-table-column prop="create_time" label="下单时间" align="center">
                <template slot-scope="scope">
                    {{new Date(scope.row.create_time * 1000).toLocaleString()}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template>
                    <el-button @click="dialogVisible = true" type="text">查看物流</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-dialog title="查看物流" :visible.sync="dialogVisible" width="50%">
            <el-timeline :reverse="reverse">
                <el-timeline-item v-for="(item, i) in data" :key="i" :timestamp="item.time">
                    {{item.context}}
                </el-timeline-item>
            </el-timeline>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                input: "",
                tableData: [],
                total: 0,
                dialogVisible: false,
                page: {
                    query: "",
                    pagenum: 1,
                    pagesize: 10,
                },
                reverse: false,
                data: [{
                        "time": "2018-05-10 09:39:00",
                        "ftime": "2018-05-10 09:39:00",
                        "context": "已签收,感谢使用顺丰,期待再次为您服务",
                        "location": ""
                    },
                    {
                        "time": "2018-05-10 08:23:00",
                        "ftime": "2018-05-10 08:23:00",
                        "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
                        "location": ""
                    },
                    {
                        "time": "2018-05-10 07:32:00",
                        "ftime": "2018-05-10 07:32:00",
                        "context": "快件到达 [北京海淀育新小区营业点]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-10 02:03:00",
                        "ftime": "2018-05-10 02:03:00",
                        "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 23:05:00",
                        "ftime": "2018-05-09 23:05:00",
                        "context": "快件到达 [北京顺义集散中心]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 21:21:00",
                        "ftime": "2018-05-09 21:21:00",
                        "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 13:07:00",
                        "ftime": "2018-05-09 13:07:00",
                        "context": "顺丰速运 已收取快件",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 12:25:03",
                        "ftime": "2018-05-09 12:25:03",
                        "context": "卖家发货",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 12:22:24",
                        "ftime": "2018-05-09 12:22:24",
                        "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
                        "location": ""
                    },
                    {
                        "time": "2018-05-08 21:36:04",
                        "ftime": "2018-05-08 21:36:04",
                        "context": "商品已经下单",
                        "location": ""
                    }
                ],
            }
        },
        methods: {
            render() {
                this.$axios.get("orders", { params: this.page }).then(res => {
                    console.log(res);
                    this.tableData = res.data.data.goods
                    this.total = res.data.data.total
                })
            },
            sizeChange(val) {
                this.page.pagesize = val
                this.render()
            },
            currentChange(val) {
                this.page.pagenum = val
                this.render()
            },
            search() {
                this.render()
            }
        },
        created() {
            this.render()
        }
    }
</script>