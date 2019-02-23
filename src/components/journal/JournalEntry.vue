
<template lang="pug">
  .journal__entry(v-if="entry.id")
    h3.journal__entry__title {{ entry.title }}
    p.journal__entry__date {{ entryDate | moment('dddd, MMMM Do YYYY') }}
    .journal__entry__content(v-html="sanitizedContent")
</template>

<script>
  export default {
    name: 'JournalEntry',
    props: {
      entry: Object
    },
    computed: {
      entryDate () {
        return new Date(this.entry.date.seconds * 1000)
      },
      sanitizedContent () {
        return this.$sanitize(this.entry.description)
      }
    }
  }
</script>

<style scoped lang="scss">
  .journal__entry {
    &__date {
      font-size: rem(12);
      color: $body-text--subtitle;
      margin-bottom: $content-gutter;
    }
  }
</style>
