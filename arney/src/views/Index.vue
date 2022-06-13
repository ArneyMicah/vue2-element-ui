<style scoped>
    #app .el-container {
        height: 100%;
    }

    .index {
        width: 100%;
        height: 100vh;
    }

    .el-header {
        background-color: #b3c0d1;
        color: #333;
        text-align: center;
        line-height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .el-aside {
        background-color: #545c64;
        color: #333;
        text-align: center;
        height: calc(100vh - 60px);
        transition: all 1s,
    }

    .el-main {
        background-color: #e9eef3;
        color: #333;
        text-align: center;
        height: calc(100vh - 60px);
    }

    .active {
        transform: rotate(-90deg);
        transition: all 0.5s;
    }

    body>.el-container {
        margin-bottom: 40px;
    }
</style>
<template>
    <div class="index">
        <el-container>
            <el-header>
                <h1>后台管理系统</h1>
                <el-button type="info" @click="edit">退出</el-button>
            </el-header>
            <el-container>
                <el-aside :width="isCollapse ? '70px' : '200px'">
                    <p style="color: #fff" @click="isCollapse = !isCollapse">
                        <i class="el-icon-s-operation" :class="{active: isCollapse}"></i>
                    </p>
                    <el-menu style="width: 100%" default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" router>
                        <el-submenu :index="item.path" v-for="item in menu" :key="item.id">
                            <template slot="title">
                                <i :class="menuIcon[item.id]" style="color: #fff; font-size: 20px; padding-right: 10px;"></i>
                                <span>{{item.authName}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item :index="ele.path" v-for="ele in item.children" :key="ele.id">{{ele.authName}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                menu: [],
                menuIcon: {
                    125: "iconfont el-icon-navicon-yhgl",
                    103: "iconfont el-icon-quanxianguanli",
                    101: "iconfont el-icon-gouwuchefill",
                    102: "iconfont el-icon-dingdanguanli",
                    145: "iconfont el-icon-shujutongji",
                },
                isCollapse: false,
            };
        },
        methods: {
            render() {
                this.$axios.get('menus').then(res => {
                    console.log(res);
                    this.menu = res.data.data
                })
            },
            edit() {
                this.$router.push({
                    path: "/login"
                })
                sessionStorage.removeItem('token')
            }
        },
        created() {
            this.render()
        }
    };
</script>