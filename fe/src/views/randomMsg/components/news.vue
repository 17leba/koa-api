<template>
<div>
    <h1>{{ news.title }}</h1>
    <p class="title-sub">
        {{ news.source }}&nbsp;{{ news.ptime }}
        <span class="tag"
              v-if="news.category">{{ news.category }}</span>
        <a :href="news.shareLink"
           class="view-more">查看原文</a>
    </p>
    <div v-html="news.body"
         class="news-body"></div>
</div>

</template>

<script>
import axios from 'utils/curl';
export default {
  data() {
    return {
      news: {}
    }
  },
  props: [
    'status',
    'resetPath'
  ],
  created() {
    this.$store.dispatch('onType', this.$route.name)
    this.$store.dispatch('showFeatureBtn')
    this.getData()
  },
  watch: {
    status() {
      this.resetPath()
      this.getData()
    }
  },
  methods: {
    async getData() {
      this.$store.dispatch('openLoading')
      let data = await axios.get('/api/random/news', {
        news_id: this.$route.query.id
      })
      if (data.news_id) {
        this.news = data[data.news_id]
      }
      this.$store.dispatch('closeLoading')

      this.$store.dispatch('getLoveData', {
        loveId: this.news.docid,
        title: this.news.title,
        type: 'news',
        hasLoved: data.has_loved
      })

      this.$nextTick(() => {
        this.renderNews()
      })
    },
    renderNews() {
      this.news.img.forEach(v => {
        this.news.body = this.news.body.replace(v.ref, `<img src="${v.src}" class="news-img">`)
      })
    }
  }
}

</script>

<style lang="scss">
@import '~css/common/mixin';
.news-img {
    display: block;
    max-width: rem(320);
    margin: rem(10) auto;
}
</style>

<style lang="scss" scoped="">
@import '~css/common/var';
@import '~css/common/mixin';
h1 {
    font-size: rem(24);
    line-height: 1.2;
    margin-bottom: rem(15);
}

.news-body {
    font-size: rem(16);
    color: #000;
    line-height: 1.5;
}

.title-sub {
    margin-bottom: rem(15);
    line-height: 1.2;
    .tag {
        background-color: $commonColor;
        color: #fff;
        padding: rem(2) rem(5);
        border-radius: rem(3);
        margin: 0 rem(2);
    }
}

.view-more {
    color: $commonColor;
}
</style>
