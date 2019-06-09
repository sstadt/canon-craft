
<template lang="pug">
  .character-share(:class="charClass")
    .character-share__icon(v-if="isActive")
      icon(name="check", size="6px")
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

<style lang="scss">
  $character-image-size: 28px;

  .character-share {
    display: inline-block;
    position: relative;
    line-height: 0;

    &__icon {
      position: absolute;
      bottom: 2px;
      right: 2px;
      pointer-events: none;
      background-color: $color-transparent-black;
      padding: 3px;
      border-radius: 50%;

      .icon {
        fill: $color--success;
      }
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
      overflow: hidden;

      img {
        object-fit: cover;
      }
    }
  }
</style>