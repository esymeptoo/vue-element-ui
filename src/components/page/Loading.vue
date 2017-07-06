<template>
    <div class="loading-container">
        <img src="./loading.png" alt="" v-if="isShow">
    </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['isShow'],
}
</script>

<style lang="less">
    .loading-container {
        position: absolute;
        z-index: 100;
        top: 0;
        width: 100%;
        height: 100%;
        img {
            display: block;
            position: absolute;
            width: 60px;
            height: 60px;
            left: 0;
            right: 0;
            margin: auto;
            top: 40%;
            animation: rotating 1s infinite;
        }
    }
    @keyframes rotating {
        form {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(360deg)
        }
    }

</style>

