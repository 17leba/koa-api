<template>
	<div>
		<div class="search" v-if="!hasResult">
			<img src="~img/random/movie-icon.png" class="movie-icon">
			<input type="text" class="search-input" v-model="movieName" @keyup.enter="searchMovie">
			<button class="sub" @click="searchMovie">搜</button>
		</div>
		<div class="result" v-if="hasResult">
			<h6 class="search-title">{{ movieData.title }}</h6>
			<a 
				class="movie-list"
				v-for="(item,index) in resultList" 
				:key="index" 
				:href="item.alt">
				<img :src="item.images.small" class="movie-cover">
				<div class="movie-main">
					<h6 class="movie-title">{{ item.title }}<i>{{ item.year }}</i></h6>
					<span class="movie-rate">{{ item.rating.average }}分</span>
					<span v-for="tag in item.genres" :key="tag" class="movie-tag">{{ tag }}</span>
					<p v-if="item.casts.length" class="movie-actor">主演：
						<span class="movie-actor-list" v-for="actor in item.casts" :key="actor.id">{{ actor.name }}</span>
					</p>
				</div>
			</a>
		</div>
	</div>
</template>

<script>
import axios from 'utils/curl';
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
    	movieName: '',
    	movieData: {},
    	resultList: [],
    	hasResult: false
    }
  },
  created() {
    this.$store.dispatch('onType', this.$route.name)
    this.$store.dispatch('hideFeatureBtn')
  	this.$store.dispatch('closeLoading')
  },
  methods: {
  	async searchMovie (){
  		if(!this.movieName.trim()){
  			Toast('搜索电影名字为空！')
  			return
  		}

  		this.$store.dispatch('openLoading')
  		this.movieData = await axios.get(`/api/random/movie/${this.movieName}`)
  		this.$store.dispatch('closeLoading')
  		
  		if(this.movieData.subjects.length){
  			this.hasResult = true
  			this.resultList = this.movieData.subjects
  		}
  	}
  }
}
</script>

<style lang="scss" scoped>
@import '~css/common/var';
@import '~css/common/mixin';
	.search{
		@include center;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		min-width: rem(320)
	}
	.search-input{
		@include input;
		width: rem(270);
		height: rem(36);
		font-size: rem(16);
		text-indent: rem(5);
		border: 1px solid #999;
		border-right: none;
		border-bottom-left-radius: rem(3);
		border-top-left-radius: rem(3);
	}
	.sub{
		@include button;
		height: rem(36);
		font-size: rem(14);
		padding: 0 rem(15);
		color: #fff;
		background-color: $commonColor;
		border-bottom-right-radius: rem(3);
		border-top-right-radius: rem(3);
	}
	.movie-icon{
		display: block;
		width: rem(80);
		height: rem(80);
		margin-bottom: rem(20);
	}
	.search-title{
		font-weight: normal;
		font-size: rem(18);
		margin: rem(10) 0 rem(15);
	}
	.movie-list{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: rem(15);
	}
	.movie-cover{
		width: rem(80);
		margin-right: rem(10);
	}
	.movie-main{
		font-size: rem(15);
	}
	.movie-title{
		font-size: rem(18);
		margin-bottom: rem(10);
		i{
			font-size: rem(12);
			font-weight: normal;
			color: #aaa;
			margin-left: rem(5);
		}
	}
	.movie-rate{
		color: #fd0f2b;
	}
	.movie-tag{
		padding: rem(2) rem(5);
		margin: rem(5);
		font-size: 12px;
		background-color: $commonColor;
		color: #fff;
	}
	.movie-actor{
		display: flex;
		flex-wrap: wrap;
		margin-top: rem(10);
		line-height: rem(20);
	}
	.movie-actor-list{
		margin-right: rem(5);
		margin-bottom: rem(5);
	}
</style>
