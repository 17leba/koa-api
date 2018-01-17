<template>
  <div>
    <div class="center-wrap" v-if="userInfo.isLogin">
      <h1>{{ userInfo.username }}</h1>
      <router-link 
        v-for="(item,index) in centerList" 
        :to="item.link"
        :key="index"
        class="center-list">{{ item.title }}<span class="arrow">&gt;</span></router-link>
    </div>
  	<div class="user-wrap" v-if="!userInfo.isLogin">
      <header>
        <div class="tab" @click="toggleTab('login')" :class="{ cur: tab === 'login'}">登录</div>
        <div class="tab" @click="toggleTab('reg')" :class="{ cur: tab === 'reg'}">注册</div>
      </header>
      <div class="login-wrap" v-show="tab === 'login'">
        <input type="text" v-model="username" class="user-input" placeholder="用户名">
        <input type="password" v-model="password" class="user-input" placeholder="密码" @keyup.enter="login">
        <button class="btn" @click="login">登录</button>
      </div>
      <div class="register-wrap" v-show="tab === 'reg'">
        <input type="text" v-model="username" class="user-input" placeholder="用户名">
        <input type="text" v-model="email" class="user-input" placeholder="邮箱">
        <input type="text" v-model="nickname" class="user-input" placeholder="昵称">
        <input type="password" v-model="password" class="user-input" placeholder="密码">
        <input type="password" v-model="confirmPassword" class="user-input" placeholder="确认密码">
        <button class="btn" @click="register">注册</button>
      </div>
    </div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'utils/curl'
import { Toast } from 'mint-ui'
  export default {
  	data (){
  		return {
        username: '',
        password: '',
        errTip: '',
        nickname: '',
        email: '',
        confirmPassword: '',
        tab: 'login',
        centerList: [{
          link: '/random/love_list',
          title: '喜欢列表'
        }]
      }
  	},
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    created (){
      this.$store.dispatch('onType', this.$route.name)
      this.$store.dispatch('closeLoading')
    },
    methods: {
      async login(){
        if(!this.username.trim() || !this.password.trim()){
          Toast('请输入用户名/密码')
          return
        }
        let result = await axios.post('/api/user/login',{
          username: this.username,
          password: this.password
        })
        if(!result.success){
          Toast(result.message)
        }else{
          // redirect
        }
      },
      async register(){
        if(!this.username.trim() || !this.email.trim()){
          Toast('请输入用户名/邮箱')
          return
        }
        if(this.password.trim() !== this.confirmPassword.trim()){
          Toast('密码不一样')
          return
        }
        let result = await axios.post('/api/user/register',{
          username: this.username,
          password: this.password,
          email: this.email
        })
        if(!result.success){
          Toast(result.message)
        }else{

        }
      },
      toggleTab (type){
        this.tab = type
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~css/common/var';
  @import '~css/common/mixin';
  h1{
    font-size: vw(20);
    line-height: 1.5;
    margin-bottom: vw(40);
    color: $commonColor;
    text-align: center;
  }
  .user-wrap{
    @include center;
    min-width: vw(320);
  }
  header{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: vw(30);
    .tab{
      line-height: vw(40);
      font-size: vw(18);
      padding: 0 vw(10);
      cursor: pointer;
      &.cur{
        border-bottom: 2px solid $commonColor;
      }
    }
  }
  .user-input{
    @include input;
    width: 100%;
    height: vw(36);
    font-size:vw(15);
    margin-bottom: vw(15);
    line-height: vw(36);
    border: 1px solid #666;
    text-indent: vw(5);
    border-radius: vw(3);
  }
  .btn{
    @include button;
    width: 100%;
    background-color: $commonColor;
    color: #fff;
    line-height: vw(36);
    border-radius: vw(5);
    font-size: vw(16);
  }
  .center-list{
    display: block;
    font-size: vw(15);
    color: #666;
    height: vw(36);
    line-height: vw(36);
    text-indent: vw(10);
    border-bottom: 1px solid $commonColor;
    .arrow{
      float: right;
      color: $commonColor;
    }
  }
</style>