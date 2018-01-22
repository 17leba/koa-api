<template>
<div>
    <h1>{{ question.title }}</h1>
    <ul class="answer-wrap">
        <li class="answer-list"
            v-for="answer in question.data">
            <div class="author">
                <img :src="answer.author.avatar_url"
                     alt=""
                     referrer="no-referrer">
                <div class="author-main">
                    <h6>{{ answer.author.name }} <a :href="`https://www.zhihu.com/question/${question.id}/answer/${answer.id}`" target="_blank" class="view-more">知乎查看</a></h6>
                    <p class="headline"
                       v-html="answer.author.headline"></p>
                </div>
            </div>
            <p class="sub-info">
                <i class="vote">{{ answer.voteup_count }}</i>人赞同&nbsp; 创建于{{ answer.created_time|formatTime }}
            </p>
            <div class="answer-content"
                 v-html="answer.content"></div>
        </li>
    </ul>
</div>

</template>

<script>
import axios from 'utils/curl';
export default {
  data() {
    return {
      question: {}
    }
  },
  props: [
    'status'
  ],
  created() {
    this.$store.dispatch('onType', this.$route.name)
    this.$store.dispatch('showFeatureBtn')
    this.getData()
  },
  watch: {
    status() {
      this.getData()
    }
  },
  methods: {
    async getData() {
      this.$store.dispatch('openLoading')
      this.question = await axios.get('/api/random/question', {
        question_id: this.$route.query.id
      })
      this.$store.dispatch('closeLoading')

      this.$store.dispatch('getLoveData', {
        loveId: this.question.id,
        title: this.question.title,
        type: 'question',
        hasLoved: this.question.has_loved
      })

      this.$nextTick(() => {
        this.renderImage()
      })
    },
    renderImage() {
      Array.from(document.querySelectorAll('.lazy')).forEach((v, i) => {
        v.setAttribute('src', v.dataset.actualsrc)
      })
    }
  },
  filters: {
    formatTime(time) {
      let date = new Date(time * 1000)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
  }
}

</script>

<style lang="scss">
@import '~css/common/mixin';
.zh-lightbox-thumb,
.thumbnail,
img.lazy {
    display: block;
    max-width: rem(350);
    margin: rem(15) auto;
}

.internal {
    color: #175199;
}
</style>

<style lang="scss" scoped="">
@import '~css/common/var';
@import '~css/common/mixin';
h1 {
    font-size: rem(20);
    line-height: 1.2;
    margin-bottom: rem(20);
}

.answer-wrap {
    line-height: 1.5;
    font-size: rem(15);
    word-wrap: break-word;
}

.answer-list {
    margin-bottom: rem(20);
}

.author {
    display: flex;
    align-items: center;
    margin-bottom: rem(5);
    img {
        max-width: rem(35);
        margin-right: rem(10);
    }
}

.author-main {
    overflow: hidden;
}

.headline {
    font-size: rem(13);
    color: #666;
}

.sub-info {
    margin-bottom: rem(10);
    color: #666;
    font-size: rem(14);
}

.vote {
    color: $commonColor;
}

.view-more {
    color: $commonColor;
    font-size: rem(12);
    font-weight: normal;
}
</style>
