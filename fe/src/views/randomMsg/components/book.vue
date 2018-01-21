<template>
	<div>
		<h1>{{ book.title }} <a :href="book.alt">查看原文</a></h1>
		<div class="book-main">
			<img :src="book.image" :alt="book.title" class="book-cover">
			<div class="book-info">
				<p>作者：<span v-for="author in book.author" :key="author">{{ author }}</span></p>
				<p>评分：<span>{{ book.rating.average }}<i>{{ book.rating.numRaters }}人评价</i></span></p>
				<p>定价：<span>{{ book.price}}</span></p>
				<p>页数：<span>{{ book.pages }}</span></p>
				<p>出版日期：<span>{{ book.pubdate }}</span></p>
				<p>标签：<span v-for="(tag,index) in book.tags" :key="index" class="tag">{{ tag.name }}</span></p>
			</div>
		</div>
		<div class="book-summary" v-if="book.summary">简介：{{ book.summary }}</div>
	</div>
</template>
<script>
import axios from 'utils/curl'
  export default {
  	data (){
  		return {
  			book: {
  				rating: {}
  			}
  		}
  	},
  	props: ['status'],
  	created (){
  		this.getData()
  	},
  	watch: {
  		status (){
  			this.getData()
  		}
  	},
  	methods: {
  		async getData(){
	  		this.$store.dispatch('onType', this.$route.name)

	  		this.$store.dispatch('openLoading')
	  		this.book = await axios.get('/api/random/book',{
	  			book_id: this.$route.query.id
	  		})
	  		this.$store.dispatch('closeLoading')

	  		this.$store.dispatch('getLoveData',{
		        loveId: this.book.id,
		        title: this.book.title,
		        type: 'book',
		        hasLoved: this.book.has_loved
	      	})
  		}
  	}
  }
</script>
<style lang="scss" scoped>
	@import '~css/common/var';
	@import '~css/common/mixin';
	h1{
		font-size: vw(20);
		margin-bottom: vw(20);
		line-height: 1.2;
		a{
			font-size: vw(13);
			color: $commonColor;
			font-weight: normal;
		}
	}
	.book-main{
		margin-bottom: vw(20);
		font-size: vw(15);
		overflow: hidden;
	}
	.book-cover{
		float: left;
		max-width: vw(100);
		margin-right: vw(10);
	}
	.book-info{
		p{
			line-height: 1.5;
		}
		.tag{
			display: inline-block;
			border-radius: vw(2);
			background-color: $commonColor;
			color: #fff;
			padding: vw(2) vw(5);
			font-size: 12px;
			margin: 0 vw(5);
		}
	}
	.book-summary{
		line-height: 1.5;
	}
</style>