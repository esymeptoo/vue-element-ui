<template>
    <div class="table" style="width: 100%;"> 
        <!--<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button class="handle-del mr10">批量删除</el-button>
            <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="1"></el-option>
                <el-option key="2" label="湖南省" value="2"></el-option>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search">搜索</el-button>
        </div>-->
        <!--<el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="date" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>-->
        <div class="table-container-top">
            <div style="display: inline-block; vertical-align: top">
                <el-button @click="dialogVisible = true">新增记录</el-button>
            </div>
            <div style="float: right; width: 60%; display: inline-block;">
                <el-input placeholder="请输入内容" v-model="search">
                    <el-button slot="append" icon="search" @click="searchProvince"></el-button>
                </el-input>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            size="tiny"
            top="30%" 
            :before-close= "clear">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="Id" prop="id">
                    <el-input type="number" v-model="ruleForm.id" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="省名" prop="name">
                    <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <div style="position: relative;">
            <!--<my-loading :isShow="loadingShow"></my-loading>-->
            <el-table :data="currentProvince" :slot="empty" v-loading="loadingShow" v-model="testGetters1">
                <el-table-column
                    prop = "id"
                    label = "id"
                    height="50"
                ></el-table-column>
                <el-table-column
                    prop = "name"
                    label = "省名"
                ></el-table-column>
                <el-table-column
                    label = "操作"
                >
                    <template scope="scope">
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="display: inline-block; float: right; margin-top: 10px;">
            <el-pagination
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="province.length"
                @current-change="handleCurrentChange"
                >
            </el-pagination>
        </div>
        <div>
            <li v-for="val in testGetter3">{{val.name}}</li>
        </div>
        <el-button @click="addTestData">测试getters新增记录</el-button>
    </div>
</template>

<script>
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
    import data from '../../util/mock'
    import Vue from 'vue'
    import myLoading from './Loading'
    Vue.http.get("http://g.cn").then(
          (successData) => {console.log(successData.body);},
          (fileData) => {console.log(fileData);}
    );
    export default {
        data() {
             var validateId = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入id'));
                } else {
                    callback();
                }
            };
            var validateProvince = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请输入省名'))
                } else {
                    callback();
                }
            }
            return {
                testData: [{
                    flag: true,
                    id: 1
                },{
                    flag: false,
                    id: 2
                }],
                search: '',
                dialogVisible: false,
                empty: '正在加载',
                list: [],
                rules: {
                    id: [
                            { validator: validateId, trigger: 'blur' },
                        ],
                        name: [
                            { validator: validateProvince, trigger: 'blur' },
                        ]
                }
            }
        },
        created(){
            //获取省列表
            console.log('获取省列表')
            this.getData();
            console.log('>>>>');
        },
        computed: {
            ...mapState({
                province: state => state.TableStore.province,
                pageSize: state => state.TableStore.pageSize,
                currentProvince: state => state.TableStore.currentProvince,
                ruleForm: state => state.TableStore.ruleForm,
                loadingShow: state => state.TableStore.loadingShow,
            }),
            ...mapGetters([
                "testGetter", "testGetters1", "testGetter3"
            ])
        },
        methods: {
            ...mapActions([
                "getData", "searchData"
            ]),
            // ...mapGetters([
            //     "getCurrentPageData"
            // ]),
            ...mapMutations([
                "currentPageChange", "getCurrentPageData", "deleteRecord", "addData"
            ]),
            handleCurrentChange(page) {
                this.currentPageChange(page)
                this.getCurrentPageData(page)
            },
            deleteRow (scope) {
                // console.log(scope.row.id)
                // console.log(currentProvince)
                this.deleteRecord(scope.row.id)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.ruleForm.id)
                        // alert('submit!');
                        //验证通过 加入table
                        Object.assign(this.ruleForm, {
                            id: parseInt(this.ruleForm.id)
                        })
                        //加入表格
                        this.addData(this.ruleForm);
                        this.$refs['ruleForm'].resetFields();
                        this.dialogVisible = false;
                        // this.list.push({
                        //     id: 1,
                        //     name: '222'
                        // })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                
            },
            clear(done) {
                this.$refs['ruleForm'].resetFields();
                done();
            },
            searchProvince: function () {
                this.searchData(this.search)
            },
            addTestData () {
                this.$store.dispatch('addTestData', {
                    type: 2,
                    name: 'zc4'
                })
            }
        },
        watch: {
            // province: function (a) {
            //     console.log(a)
            //     console.log('>>>')
            // }
        },
        components: {
            myLoading
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-del{
    border-color: #bfcbd9;
    color: #999;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>