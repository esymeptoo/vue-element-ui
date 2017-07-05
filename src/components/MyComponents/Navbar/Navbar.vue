<template>
  <div class="navbar">
    <span class="logo">{{projectName}}</span>
    <span class="user-login" @click="showMenu">{{username}}</span>
    <span class="exit" v-if="showOrNot"><a href="">退出</a></span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      username: '',
      showOrNot: false
    }
  },
  created: function (){
    this.username = localStorage.getItem('username') || 'zhouchi111'
  },
  computed: {
    ...mapState({
      projectName: state => state.NavBarStore.projectName,
      navList: state => state.NavBarStore.navList,
    }),
  },
  methods: {
    showMenu: function () {
      this.showOrNot = !this.showOrNot
    }
  }
}
</script>
<style>
  .navbar {
    height: 50px;
    background-color: #ddddea;
    position: relative;
  }
  .logo {
    height: 80%;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
    margin-left: 4%;
  }
  .user-login {
    position: absolute;
    right: 10px;
    line-height: 50px;
  }
  .user-login:hover {
    cursor: pointer;
  }
  .exit {
    display: block;
    color: red;
    position: absolute;
    top: 50px;
    right: 10px;
    background-color: #b0bbce;
    padding: 10px 20px 10px 20px;
    /*transition: right, transform 1s linear;*/
    animation: show .5s ease-in-out;
  }
  @keyframes show {
    from {
      right: -50px;
    }
    to {
        right: 10px;
    }
  }
</style>

