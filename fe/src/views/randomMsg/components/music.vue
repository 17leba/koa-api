<template>
<div class="song-main">
    <div class="song-detail">
        <div class="play-pole"
             :class="{ play:isPlaying }"></div>
        <div class="cover">
            <img :src="song.picture"
                 class="cover-img"
                 :class="[{ play:isPlaying }, {paused: !isPlaying}]"
                 ref="coveImg">
            <div class="play-btn"
                 :class="{ play:isPlaying }"
                 @click="toggleAudio"></div>
        </div>
        <audio ref="audio">
            <source :src="song.url">
        </audio>
        <p class="song-title">{{ song.title }}</p>
        <p class="artist">{{ song.artist }}</p>
    </div>
    <div class="song-progress">
        <i class="song-time">{{ currentTime }}</i>
        <div class="song-progress-out"
             ref="progress">
            <div class="song-progress-in"
                 :style="{width: currentPercent}"></div>
            <div class="song-progress-pointer"
                 :style="{left: pointPercent}"
                 ref="songPoint"></div>
            <div class="song-progress-loaded"
                 :style="{width: currentLoaded}"></div>
        </div>
        <i class="song-time">{{ totalTime }}</i>
    </div>
</div>

</template>

<script>
import axios from 'utils/curl';
export default {
  data() {
    return {
      song: {},
      lyric: [],
      record: {
        media_url: ''
      },
      isPlaying: false,
      totalTime: '',
      currentTime: '00:00',
      currentLoaded: '0%',
      currentPercent: '0%',
      pointPercent: '0%',
      isTouch: false,
      hasData: false,
      showLyric: false
    }
  },
  props: [
    'status',
    'resetPath'
  ],
  created() {
    this.$store.dispatch('onType', this.$route.name)
    this.$store.dispatch('showFeatureBtn')
    this.getMusic()
  },
  mounted() {
    this.audioEvent()
  },
  watch: {
    status() {
      this.resetPath()
      this.getMusic(true)
    },
    currentPercent() {
      let currentPercent = parseInt(this.currentPercent, 10)
      let $songPoint = this.$refs.songPoint
      let maxW = 100 - 100 * $songPoint.offsetWidth / this.$refs.progress.offsetWidth
      this.pointPercent = currentPercent >= maxW ? `${maxW}%` : `${currentPercent}%`
    }
  },
  methods: {
    async getMusic(next) {
      this.$store.dispatch('openLoading')
      let data = await axios.get('/api/random/music')
      this.song = data.song[0]
      this.hasData = true
      this.totalTime = this.formatTime(this.song.length)
      this.$store.dispatch('closeLoading')

      this.$store.dispatch('getLoveData', {
        loveId: this.song.aid,
        title: `${this.song.albumtitle}(${this.song.artist})`,
        type: 'music',
        hasLoved: this.song.has_loved
      })

      this.$nextTick(() => {
        this.$refs.audio.load()
        if (next) {
          this.isPlaying = true
          this.$refs.audio.play()
        }
      })
    },
    toggleAudio() {
      if (!this.hasData) {
        return
      }

      let $audio = this.$refs.audio
      $audio.paused ? $audio.play() : $audio.pause()

      this.isPlaying = !this.isPlaying
    },
    audioEvent() {
      let $audio = this.$refs.audio
  	  let $progress = this.$refs.progress
      
      $audio.addEventListener('timeupdate', () => {
        if (this.isTouch) {
          return
        }
        this.currentTime = this.formatTime($audio.currentTime)

        let percent = ($audio.currentTime / $audio.duration).toFixed(4)
        if (parseInt(percent, 10) === 1) {
          this.isPlaying = false
          // next
          this.getMusic(true)
        }
        this.currentPercent = !isNaN(percent) ? `${percent * 100}%` : this.currentPercent
      })

      $audio.addEventListener('progress', () => {
        let t = setInterval(() => {
          if ($audio.buffered.length !== 0) {
            clearInterval(t)
            this.currentLoaded = `${(($audio.buffered.end(0) / $audio.duration) * 100).toFixed(2)}%`
          }
        }, 1000)
      })

      function startSlide(e) {
        this.isTouch = true
      }
      function moveSlide(e) {
      	let progressX = $progress.getBoundingClientRect().left
      	let progressW = $progress.offsetWidth

        let touch = e.touches && e.touches[0]
        let clientX = touch.clientX
        let percent = (clientX - progressX) / progressW
        percent = percent < 0 ? 0 : percent > 1 ? 1 : percent
        this.currentPercent = `${percent * 100}%`
      }
      function endSlide(e) {
        this.isTouch = false
        $audio.currentTime = $audio.duration * parseFloat(this.currentPercent) / 100
        this.currentTime = this.formatTime($audio.currentTime)
      }

      $progress.addEventListener('touchstart', startSlide.bind(this), false)
      $progress.addEventListener('touchmove', moveSlide.bind(this), false)
      $progress.addEventListener('touchend', endSlide.bind(this), false)
    },
    formatTime(time) {
      if (!time) {
        return '00:00'
      }
      let min = Math.floor(time / 60)
      let sec = Math.ceil(time % 60)
      return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
    }
  }
}

</script>

<style lang="scss" scoped="">
@import '~css/common/var';
@import '~css/common/mixin';
.song-main {
    position: relative;
    top: rem(-18);
}

.song-detail {
    position: relative;
    padding-top: rem(20);
    margin-bottom: rem(30);
    text-align: center;
}

.play-pole {
    position: absolute;
    left: 53%;
    top: rem(-26);
    margin-left: rem(-45);
    z-index: 9;
    width: rem(48);
    height: rem(162);
    background: url(~img/random/play-pole.png) no-repeat left top;
    background-size: 100%;
    transform: rotate(-80deg);
    transform-origin: 32px 25px;
    transition: transform .5s linear;
    &.play {
        transform: rotate(-55deg);
    }
}

.cover {
    position: relative;
    margin-bottom: rem(25);
}

.cover-img {
    width: rem(270);
    height: rem(270);
    border: rem(5) solid rgba(0, 0, 0, .5);
    border-radius: 50%;
    animation-duration: 20s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-name: rotate;
    &.play {
        animation-play-state: running;
    }
    &.paused {
        animation-play-state: paused;
    }
}

.play-btn {
    @include center;
    width: rem(60);
    height: rem(60);
    background: url(~img/random/btn-pause.png) no-repeat left top;
    background-size: 100%;
    &.play {
        background-image: url(~img/random/btn-play.png);
    }
}

.lyric-tips {
    font-size: rem(18);
}

.song-title {
    font-size: rem(20);
    margin-bottom: rem(10);
    line-height: 1.2;
    color: $commonColor;
}

.artist {
    color: #666;
}

.song-desc {
    font-size: rem(15);
}

.song-progress {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.song-time {
    font-size: rem(13);
    margin: 0 rem(6);
}

.song-progress-out {
    position: relative;
    width: rem(236);
    height: rem(16);
    &:before {
        @include center;
        width: 100%;
        content: '';
        background-color: rgba(250, 125, 60, .5);
        height: rem(2);
    }
}

.song-progress-in {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 3;
    height: rem(2);
    background-color: #ff3f22;
}

.song-progress-pointer {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 10;
    width: rem(8);
    height: rem(8);
    border-radius: 50%;
    background-color: #ff3f22;
}

.song-progress-loaded {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 2;
    width: rem(150);
    height: rem(2);
    background-color: $commonColor;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
