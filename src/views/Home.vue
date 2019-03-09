
<template lang="pug">
  .home
    transition(name="slide-fade-down")
      hero(v-if="firstPost.image", :title="firstPost.title", :image="firstPost.image.url")
        router-link.button.button--small(to="/games", v-if="currentUser && currentUser.uid") My Games
    .container
      .row
        .column.small-12.medium-9
          .feature
            //- h2.feature__title Most Recent Blog Post
            .u-content(v-html="featureSynopsis") #[a.feature__cta read more]
          //- .row.small-up-1.medium-up-3.large-up-4
          //-   .column(v-for="n in 6")
          //-     post-card
        .column.small-12.medium-3
          quest-card(v-for="quest in recentQuests", :quest="quest", :key="quest.id")
</template>

<script>

import { mapState } from 'vuex'

import Hero from '@/components/ui/Hero.vue'
import PostCard from '@/components/card/PostCard.vue'
import QuestCard from '@/components/card/QuestCard.vue'

export default {
  name: 'Home',
  components: { Hero, PostCard, QuestCard },
  computed: {
    ...mapState({
      posts: state => state.posts.all,
      currentUser: state => state.user.currentUser,
      quests: state => state.quests.all
    }),
    firstPost () {
      return (this.posts.length > 0) ? this.posts[0] : {}
    },
    featureSynopsis () {
      return (this.firstPost.content) ? this.$sanitize(this.firstPost.content.html) : ''
    },
    recentQuests () {
      return this.quests.sort((p, c) => {
        if (p.last_updated > p.last_updated) return 1
        if (p.last_updated < c.last_updated) return -1
        return 0
      }).slice(0, 3)
    }
  },
  created () {
    this.$store.dispatch('posts/populate')
  }
}
</script>

<style lang="scss">
  .home {
    .card--quest {
      margin-bottom: 30px;
    }
  }
</style>
