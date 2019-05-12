
<template lang="pug">
  .character-share(:class="charClass")
    icon(v-if="isActive", name="check", size="12px")
    icon-button(:label="buttonLabel", :image="character.avatar", image-classes="character-share__image", @click="selected")
</template>

<script>
  import { mapState } from 'vuex'

  import Icon from '@/components/ui/Icon.vue'
  import IconButton from '@/components/buttons/IconButton.vue'

  export default {
    name: 'CharacterShare',
    components: { Icon, IconButton },
    props: {
      character: Object,
      players: Array
    },
    computed: {
      isActive () {
        return Boolean(this.players.indexOf(this.character.player) > -1)
      },
      charClass () {
        return {
          'active': this.isActive
        }
      },
      buttonLabel () {
        return (this.isActive) 
          ? `Share with ${this.character.name}` 
          : `Hide from ${this.character.name}`
      }
    },
    methods: {
      selected () {
        this.$emit('selected')
      }
    }
  }
</script>

<style scoped lang="scss">
  $character-image-size: 28px;

  .character-share {
    display: inline-block;
    position: relative;
    line-height: 0;

    & > .icon {
      position: absolute;
      top: $character-image-size - 2px;
      right: 2px;
      transform: translateY(-100%);
      fill: $color--success;
      pointer-events: none;
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
      height: $character-image-size;
      width: $character-image-size;
    }
  }
</style>