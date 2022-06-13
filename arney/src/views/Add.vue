<style scoped>
</style>
<template>
    <div class="add">
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <el-tabs tab-position="left" style="height: 100%;" :before-leave="handleClick">
            <el-tab-pane label="基本信息">
                <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" align="left">
                    <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model="ruleForm.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="goods_price">
                        <el-input v-model="ruleForm.goods_price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="goods_number">
                        <el-input v-model="ruleForm.goods_number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="goods_weight">
                        <el-input v-model="ruleForm.goods_weight"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="goods_cat">
                        <el-cascader style="width: 100%" :options="list" @change="handleChange" :props="{value: 'cat_id', label: 'cat_name' }">
                            <template slot-scope="{node, data}">
                                <span>{{ data.cat_name }}</span>
                                <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                            </template>
                        </el-cascader>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品参数">商品参数</el-tab-pane>
            <el-tab-pane label="商品属性">商品属性</el-tab-pane>
            <el-tab-pane label="商品图片">
                <el-upload class="upload-demo" drag action="http://175.27.228.178:3434/api/private/v1/upload" multiple :headers="headers" :on-success="success" list-type="picture">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容">
                <quill-editor ref="myQuillEditor" v-model="addForm.goods_introduce">
                </quill-editor>
                <el-button type="primary" @click="add">添加商品</el-button>
            </el-tab-pane>
            <el-tab-pane label="完成">完成</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                headers: {
                    Authorization: window.sessionStorage.getItem("token"),
                },
                active: 0,
                list: [],
                file: [],
                ruleForm: {
                    goods_name: "",
                    goods_price: "",
                    goods_number: "",
                    goods_weight: "",
                    goods_cat: "",
                },
                addForm: {
                    pics: [],
                    goods_introduce: "",
                },
                rules: {
                    goods_name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                    ],
                    goods_price: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' },
                    ],
                    goods_number: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    goods_weight: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    goods_cat: [
                        { required: true, message: '请输入商品分类', trigger: 'blur' },
                    ],
                },
            }
        },
        methods: {
            render() {
                this.$axios.get("categories").then(res => {
                    console.log(res);
                    this.list = res.data.data
                })
            },
            handleChange(val) {
                console.log(val);
                this.ruleForm.goods_cat = val.join(",");
            },
            handleClick(val) {
                let flag = false;
                for(let i in this.roulForm == ""){
                    return false;
                }
                if(flag){

                }
                this.active = Number(val);
            },
            add() {
                this.$axios.post("goods", { ...this.ruleForm, ...this.addForm }).then(res => {
                    console.log(res);
                    if (res.data.meta.status == 201) {
                        this.$message({
                            message: res.data.meta.msg,
                            type: 'success'
                        });
                        this.$router.push({ path: "/goods", })
                    } else {
                        this.$message({
                            message: res.data.meta.msg,
                            type: 'danger'
                        });
                    }
                })
            },
            success(res) {
                console.log(res);
                this.addForm.pics.push({ "pic": res.data.tmp_path})
            },
        },
        created() {
            this.render()
        }
    }
</script>