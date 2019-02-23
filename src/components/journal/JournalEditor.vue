
<template lang="pug">
  .journal__editor(v-if="entry.id")
    form(@submit.prevent="save", novalidate)
      .game-input
        label(:for="titleId") Title
        input(type="text", name="title", :id="titleId", v-model="entry.title", v-validate="'required'")
        span.error(v-show="errors.has('title')") {{ errors.first('title') }}
      .game-input
        label Date
        date-picker(v-model="date")
      .game-input
        wysiwyg(v-model="entry.description")
      .controls
        .controls__group
          confirm-button(label="Delete", :small="true", @confirmed="removeEntry")
        .controls__group
          .toggle-input
            label {{ publishedLabel }}
            toggle-button(v-model="entry.published")
          primary-button(label="Save", :submit="true", :small="true")
          //- TODO: publish/unpublish button
</template>

<script>
  import { clone, debounce } from '@/lib/util'

  import Wysiwyg from '@/components/ui/Wysiwyg.vue'
  import ConfirmButton from '@/components/ui/ConfirmButton.vue'
  import PrimaryButton from '@/components/ui/PrimaryButton.vue'
  import DatePicker from '@/components/ui/DatePicker.vue'

  export default {
    name: 'JournalEditor',
    components: { Wysiwyg, ConfirmButton, PrimaryButton, DatePicker },
    props: {
      entry: Object
    },
    data () {
      return {
        date: new Date(this.entry.date.seconds * 1000),
        updated: false,
        saving: false
      }
    },
    computed: {
      titleId () {
        return `entry_title_${this.entry.id}`
      },
      isPublished () {
        return this.entry.published
      },
      publishedLabel () {
        return (this.entry.published === true) ? 'Shared' : 'Secret'
      }
    },
    methods: {
      removeEntry () {
        this.$emit('remove', this.entry.id)
      },
      hasUpdated () {
        if (this.saving === true) {
          this.saving = false
        }
      },
      save: debounce(function () {
        let updatedEntry = {
          id: this.entry.id,
          title: this.entry.title,
          published: this.entry.published,
          date: new Date(this.date),
          description: this.$sanitize(this.entry.description)
        }
        
        this.saving = true
        this.$emit('save', updatedEntry)
      }, 100)
    },
    watch: {
      isPublished () {
        this.save()
      },
      entry: {
        handler () {
          this.hasUpdated()
        },
        deep: true
      },
      date () {
        this.hasUpdated()
      }
    }
  }
</script>

<style scoped lang="scss">
</style>