
<template lang="pug">
  .journal__entry(v-if="entry.id")
    h3.journal__entry__title {{ entry.title }}
    p.journal__entry__date {{ entryDate | moment('dddd, MMMM Do YYYY') }}
    .journal__entry__content
      .content(v-html="sanitizedContent", :style="contentStyle", ref="content")
      primary-button.journal__entry__expand(:label="expandLabel", :text="true", @click="toggleFullContent")
</template>

<script>
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'

  const READ_MORE_LABEL = 'Read More'
  const READ_LESS_LABEL = 'Read Less'
  const COLLAPSED_MAX_HEIGHT = 300

  export default {
    name: 'JournalEntry',
    components: { PrimaryButton },
    props: {
      entry: Object
    },
    data () {
      return {
        showFullContent: false,
        expandLabel: READ_MORE_LABEL,
        contentHeight: 'auto'
      }
    },
    computed: {
      entryDate () {
        return new Date(this.entry.date.seconds * 1000)
      },
      sanitizedContent () {
        return this.$sanitize(this.entry.description)
      },
      contentStyle () {
        return {
          'max-height': (this.showFullContent) ? this.contentHeight : `${COLLAPSED_MAX_HEIGHT}px`
        }
      },
      canResize () {
        return this.$refs.content && this.$refs.content.scrollHeight > COLLAPSED_MAX_HEIGHT
      }
    },
    mounted () {
      this.resize()
    },
    methods: {
      resize () {
        this.contentHeight = `${this.$refs.content.scrollHeight}px`
      },
      toggleFullContent () {
        this.resize()

        if (this.showFullContent) {
          this.expandLabel = READ_MORE_LABEL
          this.showFullContent = false
        } else {
          this.expandLabel = READ_LESS_LABEL
          this.showFullContent = true
        }
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

    &__expand {
      margin-top: 5px;
      float: right;
    }

    &__content {
      @include clearfix;
    }

    .content {
      overflow: hidden;
      transition: 0.3s ease max-height;
    }
  }
</style>
