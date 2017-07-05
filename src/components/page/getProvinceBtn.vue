<template>
    <el-button @click="tell" v-model="name">{{childMsg}}</el-button>
</template>

<script>
export default {
    props: ['childMsg'],
    data() {
        return {
            type: 1,
            list: {
                name: '省列表'
            },
            name: this.childMsg
        }
    },
    methods: {
        tell() {
            this.$emit('changeParent', '改变父组件')
        }
    },
    watch: {    
        'name': function () {
            console.log(this.name)
        }
    }
}
</script>
