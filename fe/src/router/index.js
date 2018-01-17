import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const random = () => import('@/views/randomMsg/app')
const randomQuestion = () => import('@/views/randomMsg/components/question')
const randomNews = () => import('@/views/randomMsg/components/news')
const randomMusic = () => import('@/views/randomMsg/components/music')
const randomBook = () => import('@/views/randomMsg/components/book')
const randomMovie = () => import('@/views/randomMsg/components/movie')
const myCenter = () => import('@/views/randomMsg/components/myCenter')
const loveList = () => import('@/views/randomMsg/components/loveList')

export default new Router({
  mode: 'history',
  routes: [{
    path: '/random',
    component: random,
    children: [
      {
        path: 'question',
        name: 'question',
        component: randomQuestion
      },
      {
        path: 'news',
        name: 'news',
        component: randomNews
      },
      {
        path: 'music',
        name: 'music',
        component: randomMusic
      },
      {
        path: 'book',
        name: 'book',
        component: randomBook
      },
      {
        path: 'movie',
        name: 'movie',
        component: randomMovie
      },
      {
        path: 'center',
        name: 'center',
        component: myCenter
      },
      {
        path: 'love_list',
        name: 'loveList',
        component: loveList
      }
    ]
  }]
})