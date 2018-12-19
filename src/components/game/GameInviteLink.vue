
<template lang="pug">
  .game-invite
    input.game-invite__link#game-invite-link(type="text", v-model="inviteLink", readonly)
    .game-invite__btn.game-invite__btn--reset
      button.button.button--text(@click="resetLink",:disabled="!hasInviteLink") Reset Link
    .game-invite__btn.game-invite__btn--copy
      button.button.button--text(@click="copyLink") Copy Link
</template>

<script>
  export default {
    name: 'GameInviteLink',
    props: {
      slug: String,
      game: String
    },
    computed: {
      hasInviteLink () {
        return this.slug.length > 0
      },
      inviteLink () {
        return `${window.location.origin}/#/join/${this.slug}`
      }
    },
    methods: {
      resetLink () {
        this.$store.dispatch('games/update', {
          id: this.game,
          inviteLink: false
        })
      },
      copyLink () {
        var copyText = document.querySelector("#game-invite-link")
        copyText.select()
        document.execCommand("copy")
      }
    }
  }
</script>

<style scoped lang="scss">
  .game-invite {
    display: grid;
    grid-template-areas: "link link" "reset copy";
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;

    &__link {
      // font-size: rem(20);
      grid-area: link;
      border: none;
      text-align: center;
    }

    &__btn {
      &--reset {
        grid-area: reset;
        text-align: left;
      }

      &--copy {
        grid-area: copy;
        text-align: right;
      }
    }
  }
</style>
