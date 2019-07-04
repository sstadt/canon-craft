
import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/Home.vue')
const Styleguide = () => import('@/views/Styleguide.vue')
const GameBrowser = () => import('@/views/GameBrowser.vue')
const Game = () => import('@/views/Game.vue')
const UserProfile = () => import('@/views/UserProfile.vue')
const JoinGame = () => import('@/views/JoinGame.vue')

Vue.use(Router)

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'styleguide',
    path: '/styleguide',
    component: Styleguide,
    meta: {
      title: 'Canon Craft - Styleguide'
    }
  },
  {
    name: 'games',
    path: '/games',
    component: GameBrowser,
    meta: {
      title: 'Canon Craft - My Games'
    }
  },
  {
    name: 'game',
    path: '/game/:id',
    component: Game,
    meta: {
      title: 'Canon Craft - Game'
    }
  },
  {
    name: 'my-account',
    path: '/my-account',
    component: UserProfile,
    meta: {
      title: 'Canon Craft - My Profile'
    }
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

/**
 * Set Page Titles
 */
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag))

  next()
})

export default router;
