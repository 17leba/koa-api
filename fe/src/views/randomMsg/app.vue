<template>
  <div class="main">
    <router-view 
      v-show="!isLoading" 
      :status="status"
    />
    <my-footer></my-footer>
    <Spinner color="#fa7d3c" class="loading" v-show="isLoading"></Spinner>
    <button class="change-content-btn" @click="changeContent"></button>
    <button class="love-btn" :class="{ select: loveData.hasLoved }" @click="loveContent"></button>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { Spinner, Toast } from 'mint-ui'
  import myFooter from './components/footer'
  import axios from 'utils/curl'
  export default {
    data (){
      return {
        status: false,
        loveTag: 0
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.random.isLoading,
        userId: state => state.user.userInfo.user_id,
        loveData: state => state.random.loveData
      })
    },
    components: {
      myFooter,
      Spinner
    },
    created (){
      this.$store.dispatch('getLogin')
    },
    methods: {
      changeContent (){
        this.status = !this.status
      },
      async loveContent (){
        let res = await axios.post('/api/love/update',{
          love_id: this.loveData.loveId,
          type: this.loveData.type,
          title: this.loveData.title,
          tag: this.loveData.hasLoved ? 0 : 1
        })
        if(res.success){
          this.loveData.hasLoved = !this.loveData.hasLoved
        }else{
          Toast(res.message)
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
@import '~css/common/mixin';
@mixin scopeBtn{
    @include button;
    position: fixed;
    right: vw(10);
    z-index: 999;
    width: vw(40);
    height: vw(40);
    background-position: center center;
    background-color: rgba(255,120,86,.8);
    background-repeat: no-repeat;
    border-radius: 50%;
    cursor: pointer;
}
  .main{
    position: relative;
    padding: vw(20) vw(15) vw(80);
    min-height: 90vh;
    box-sizing: border-box;
  }
  .loading{
    @include center;
  }
  .change-content-btn{
    @include scopeBtn;
    top: vw(60);
    background-image: url(~img/random/change.png);
    background-size: vw(20) auto;
  }
  .love-btn{
    @include scopeBtn;
    top: vw(10);
    background-image: url(~img/random/love.png);
    background-size: vw(30) auto;
    &.select{
      background-image: url(~img/random/love-selected.png);
    }
  }
</style>