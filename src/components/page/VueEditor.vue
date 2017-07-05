<template>
    <div>
        <!--<el-button class="first-btn" @click="getProvince('/ws/district/v1/getchildren?key=WJJBZ-W64HU-472VU-2XGIA-U2LNZ-ENBI7')">{{list.name}}</el-button>-->
        <button-province :child-msg="msg" @changeParent="_changeParent"></button-province>
        <button @click="changeChild">{{child_msg}}</button>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
            访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
        </div>
        <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor';
    import buttonProvince from './getProvinceBtn';
    import { mapState, mapActions } from 'vuex'
    export default {
        data: function(){
            return {
                content: '<p>Hello BBK</p>',
                editorOption: {
                    // something config
                },
                msg: '改变父组件',
                child_msg: '改变子组件'
            }
        },
        watch: {    
            child_msg: function () {
                console.log(`改变的值${this.child_msg}`)
            }
        },
        created: function () {
            console.log('created')
            this.child_msg = '改变子组件'
        },
        updated: function () {
            console.log('updated')
        },
        destroyed: function () {
            console.log('destroyed')
        },
        components: {
            quillEditor, buttonProvince
        },
        methods: {
            ...mapActions([
                'getProvince'
            ]),
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            },
            changeChild () {
                this.msg = 'zhocuhi'
                console.log(this.msg)
            },
            _changeParent (word) {
                this.child_msg = '子组件改变了父组件';
                this.getProvince('/ws/district/v1/getchildren?key=WJJBZ-W64HU-472VU-2XGIA-U2LNZ-ENBI7')
            }
        },
        computed: {
            ...mapState({
                list: (state) => {
                    console.log(state.VueEditorStore.list)
                    return state.VueEditorStore.list;
                },
            }),
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
    .first-btn {
        border: 1px solid red !important;
        display: inline-block;
        margin-bottom: 10px;
    }
</style>