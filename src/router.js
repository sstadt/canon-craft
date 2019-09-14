
import Vue from 'vue'
import Router from 'vue-router'

const Splash = () => import('@/views/Splash.vue')
const Home = () => import('@/views/Home.vue')
const Styleguide = () => import('@/views/Styleguide.vue')
const GameBrowser = () => import('@/views/GameBrowser.vue')
const Game = () => import('@/views/Game.vue')
const UserProfile = () => import('@/views/UserProfile.vue')
const JoinGame = () => import('@/views/JoinGame.vue')

Vue.use(Router)

const routes = [
  {
    name: 'splash',
    path: '/',
    component: Splash
  },
  {
    name: 'home',
    path: '/home',
    component: Home
  },
  {
    name: 'styleguide',
    path: '/styleguide',
    component: Styleguide
  },
  {
    name: 'games',
    path: '/games',
    component: GameBrowser
  },
  {
    name: 'game',
    path: '/game/:id',
    component: Game
  },
  {
    name: 'my-account',
    path: '/my-account',
    component: UserProfile
  },
  {
    name: 'join',
    path: '/join/:invite',
    component: JoinGame
  }
];

const router = new Router({
  mode: 'history',
  routes
})

export default router;
