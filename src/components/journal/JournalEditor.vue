
<template lang="pug">
  .journal__editor(v-if="entry.id")
    form(@submit.prevent="save", novalidate)
      .game-input
        label(:for="title_id") Title
        input(type="text", name="title", :id="title_id", v-model="entry.title", v-validate="'required'")
        span.error(v-show="errors.has('title')") {{ errors.first('title') }}
      .game-journal__new-entry
        label Date
        date-picker(v-model="date")
      .game-input
        wysiwyg(v-model="entry.description")
      .controls
        .controls__group
          confirm-button(label="Delete", :small="true", @confirmed="removeEntry")
        .controls__group
          primary-button(label="Save", :submit="true", :small="true")
          //- TODO: publish/unpublish button
</template>

<script>
  import { clone } from '@/lib/util'

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
        date: new Date(this.entry.date.seconds * 1000)
      }
    },
    computed: {
      title_id () {
        return `entry_title_${this.entry.id}`;
      }
    },
    methods: {
      removeEntry () {
        this.$emit('remove', this.entry.id)
      },
      save () {
        let updatedEntry = {
          id: this.entry.id,
          title: this.entry.title,
          date: new Date(this.date).getTime() / 1000,
          description: this.$sanitize(this.entry.description)
        }
        // console.log(this.date, this.entry.date, updatedEntry.date)
        // updatedEntry.date = this.date
        this.$emit('save', updatedEntry)
      }
    }
  }
</script>

<style scoped lang="scss">
  .journal__editor {
    margin-bottom: $grid-gutter;
  }
</style>