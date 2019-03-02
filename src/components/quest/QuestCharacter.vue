
<template lang="pug">
  .quest__character(:class="charClass")
    icon-button(:label="buttonLabel", :image="character.avatar", image-classes="quest__character__image", @click="selected")
</template>

<script>
  import { mapState } from 'vuex'

  import IconButton from '@/components/buttons/IconButton.vue'

  export default {
    name: 'QuestCharacter',
    components: { IconButton },
    props: {
      character: Object,
      quest: Object
    },
    computed: {
      isActive () {
        return Boolean(this.quest.players.indexOf(this.character.player) > -1)
      },
      charClass () {
        return {
          'active': this.isActive
        }
      },
      buttonLabel () {
        let action = (this.isActive) ? `Share ${this.quest.title} with` : `Hide ${this.quest.title} from`
        return `${action} ${this.character.name}`
      }
    },
    methods: {
      selected () {
        this.$emit('selected')
      }
    }
  }
</script>

<style lang="scss">
  .quest__character {
    display: inline-block;

    &:not(:last-child) {
      margin-right: 8px;
    }

    &.active .button {
      border-color: $color--warning;
    }

    &__image {
      display: block;
      border-radius: 2px;
    }

    .button {
      line-height: 0;
      border: 4px solid transparent;
      border-radius: 2px;
      height: 32px;
      width: 32px;
    }
  }
</style>
