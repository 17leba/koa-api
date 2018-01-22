<template>
<div>
    <footer>
        <router-link v-for="(item, index) in tab"
                     :to="item.link"
                     :key="index"
                     class="tab"
                     :class="[{ cur: item.index === curType }, item.index]">{{ item.name }}</router-link>
    </footer>
</div>

</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      tab: [
        {
          link: '/random/question',
          name: '问题',
          index: 'question'
        },
        {
          link: '/random/news',
          name: '新闻',
          index: 'news'
        },
        {
          link: '/random/music',
          name: '音乐',
          index: 'music'
        },
        {
          link: '/random/book',
          name: '书',
          index: 'book'
        },
        {
          link: '/random/movie',
          name: '电影',
          index: 'movie'
        },
        {
          link: '/random/center',
          name: '我的',
          index: 'center'
        }
      ]
    }
  },
  computed: {
    ...mapState({
          curType: state => state.random.curType
    })
  }
}

</script>

<style lang="scss" scoped="">
@import '~css/common/var';
@import '~css/common/mixin';
footer {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    width: 100%;
    padding: rem(10) 0;
    background-color: #fff;
    border-top: 2px solid $commonColor;
}

.tab {
    min-width: rem(25);
    padding: rem(30) 0 0;
    font-size: rem(15);
    text-align: center;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: rem(22) auto;
    &.cur {
        color: $commonColor;
    }
    &.question {
        background-image: url(~img/random/question.png);
        &.cur {
            background-image: url(~img/random/question-selected.png);
        }
    }
    &.news {
        background-image: url(~img/random/news.png);
        &.cur {
            background-image: url(~img/random/news-selected.png);
        }
    }
    &.music {
        background-image: url(~img/random/music.png);
        &.cur {
            background-image: url(~img/random/music-selected.png);
        }
    }
    &.book {
        background-image: url(~img/random/book.png);
        &.cur {
            background-image: url(~img/random/book-selected.png);
        }
    }
    &.movie {
        background-image: url(~img/random/movie.png);
        &.cur {
            background-image: url(~img/random/movie-selected.png);
        }
    }
    &.center {
        background-image: url(~img/random/center.png);
        &.cur {
            background-image: url(~img/random/center-selected.png);
        }
    }
}
</style>
