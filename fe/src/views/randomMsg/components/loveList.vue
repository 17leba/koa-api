<template>
	<div>
		<router-link 
			v-for="(item,index) in result" 
			:key="index"
			:to="switchType(item)"
			class="love-list"><i>{{ item.type }}：</i>{{ item.title }}</router-link>
	</div>
</template>
<script>
import axios from 'utils/curl'
import { mapState } from 'vuex'
  export default {
  	data (){
  		return {
  			result: []
  		}
  	},
  	computed: {
  		...mapState({
  			userId: state => state.user.userInfo.user_id,
        	loveData: state => state.random.loveData
  		})
  	},
  	watch: {
  		userId (){
  			this.getData()
  		}
  	},
  	created (){
      this.$store.dispatch('hideFeatureBtn')
  		this.userId && this.getData()
  	},
  	methods: {
  		async getData (){
  			this.$store.dispatch('openLoading')
  			this.result = await axios.get('/api/love/list',{
	  			user_id: this.userId
	  		})
	  		this.$store.dispatch('closeLoading')
  		},
  		switchType(item){
  			let url = ''
  			switch(item.type){
  				case 'question':
	  				url = `/random/question?id=${item.love_id}`
	  				break
  				case 'news':
	  				url = `/random/news?id=${item.love_id}`
	  				break
	  			case 'music':
	  				// url = ''
	  				break
	  			case 'book':
	  				url = `/random/book?id=${item.love_id}`
	  				break
  			}
  			return url
  		}
  	}
  }
</script>
<style lang="scss" scoped>
	@import '~css/common/var';
	@import '~css/common/mixin';
	.love-list{
		@include line-clamp(1);
		display: block;
		line-height: rem(36);
		text-indent: rem(5);
		border-bottom: 1px solid $commonColor;
		i{
			color: #999;
		}
	}
</style>