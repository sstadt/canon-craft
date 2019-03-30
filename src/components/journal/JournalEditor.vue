
<template lang="pug">
  .journal__editor(v-if="entry.id")
    form(@submit.prevent="save", novalidate)
      transition(name="slide-fade-left", mode="out-in")
        div(v-if="editing")
          .game-input
            label(:for="titleId") Title
            input(type="text", name="title", :id="titleId", v-model="title", v-validate="'required'")
            span.error(v-show="errors.has('title')") {{ errors.first('title') }}
          .game-input
            label Date
            date-picker(v-model="date")
          .game-input
            wysiwyg(v-model="description")
        journal-entry(v-else, :entry="entry")
      .controls
        .controls__group
          confirm-button(label="Delete", :small="true", @confirmed="removeEntry")
        .controls__group
          .toggle-input
            label {{ publishedLabel }}
            toggle-button(v-model="published")
          submit-button(v-if="editing", label="Save", :small="true")
          primary-button(v-else, label="Edit", :small="true", @click="editing = true")
</template>

<script>
  import { clone, debounce } from '@/lib/util'

  import Wysiwyg from '@/components/ui/Wysiwyg.vue'
  import DatePicker from '@/components/ui/DatePicker.vue'
  import ConfirmButton from '@/components/buttons/ConfirmButton.vue'
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import SubmitButton from '@/components/buttons/SubmitButton.vue'
  import JournalEntry from '@/components/journal/JournalEntry.vue'

  export default {
    name: 'JournalEditor',
    components: {
      Wysiwyg, ConfirmButton, DatePicker, 
      PrimaryButton, SubmitButton,
      JournalEntry
    },
    props: {
      entry: Object
    },
    data () {
      return {
        title: this.entry.title,
        description: this.entry.description,
        published: this.entry.published,
        date: new Date(this.entry.date.seconds * 1000),
        editing: false,
        updated: false,
        saving: false
      }
    },
    computed: {
      titleId () {
        return `entry_title_${this.entry.id}`
      },
      publishedLabel () {
        return (this.published === true) ? 'Shared' : 'Secret'
      }
    },
    methods: {
      removeEntry () {
        this.$emit('remove', this.entry.id)
      },
      save: debounce(function () {
        let updatedEntry = {
          id: this.entry.id,
          title: this.title,
          published: this.published,
          date: new Date(this.date),
          description: this.$sanitize(this.description)
        }
        console.log(updatedEntry)
        this.editing = false
        this.saving = true
        this.$emit('save', updatedEntry)
      }, 100)
    },
    watch: {
      published () {
        this.save()
      }
    }
  }
</script>

<style scoped lang="scss">
</style>