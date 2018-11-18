
<template lang="pug">
  .home
    hero(title="Lorem Ipsum Dolor")
      a.button Games
      a.button New Games
    .container
      .row.reverse-tablet-up
        .column.small-12.medium-3
          a.card.card--quest(v-for="n in 2")
            img(src="//placehold.it/335x150")
            .card__content
              h3.card__title Recent Quest
              p.card__status 0/1: Lorem Ipsum
              p.card__description Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
        .column.small-12.medium-9
          .feature
            h2.feature__title Most Recent Blog Post
            p.feature__description Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            a.feature__cta Read More
          .row.small-up-1.medium-up-3
            .column(v-for="n in 6")
              a.feature-grid__item.card.card--lore
                img(src="//placehold.it/335x150")
                .card__content
                  h3.card__title Recent Post
</template>

<script>
import Hero from '@/components/ui/Hero.vue'

export default {
  name: 'Home',
  components: { Hero }
}
</script>
