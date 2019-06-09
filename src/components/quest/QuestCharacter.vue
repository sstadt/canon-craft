
<template lang="pug">
  .quest__character(:class="charClass")
    icon(v-if="isActive", name="check", size="12px")
    icon-button(:label="buttonLabel", :image="character.avatar", image-classes="quest__character__image", @click="selected")
</template>

<script>
  import { mapState } from 'vuex'

  import Icon from '@/components/ui/Icon.vue'
  import IconButton from '@/components/buttons/IconButton.vue'

  export default {
    name: 'QuestCharacter',
    components: { Icon, IconButton },
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
  $quest-character-image-size: 28px;

  .quest__character {
    display: inline-block;
    position: relative;
    line-height: 0;

    & > .icon {
      position: absolute;
      top: $quest-character-image-size - 2px;
      right: 2px;
      transform: translateY(-100%);
      fill: $color--success;
    }

    &:not(:first-child) {
      margin-left: 8px;
    }

    &__image {
      display: block;
      border-radius: 2px;
    }

    .button {
      line-height: 0;
      border-radius: 2px;
      height: $quest-character-image-size;
      width: $quest-character-image-size;
      overflow: hidden;

      img {
        object-fit: cover;
      }
    }
  }
</style>
