
<template lang="pug">
  .game-invite.callout
    p.game-invite__title Send players this link to invite them to the game
    input.game-invite__link#game-invite-link(type="text", v-model="inviteLink", readonly)
    .game-invite__qrcode
      qrcode-vue(:value="inviteLink")
    .game-invite__btn.game-invite__btn--reset
      button.button.button--text(@click="resetLink",:disabled="!hasInviteLink") Reset Link
    .game-invite__btn.game-invite__btn--copy
      button.button.button--text(@click="copyLink") Copy Link
</template>

<script>
  import QrcodeVue from 'qrcode.vue'

  export default {
    name: 'GameInviteLink',
    components: { QrcodeVue },
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
    grid-template-areas: "link link qrcode"
                         "title title qrcode"
                         "reset copy qrcode";
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 0.5fr;
    max-width: 525px;

    &__title {
      text-align: center;
      grid-area: title;
      margin: 0;
      font-size: rem(14);
    }

    &__link {
      font-size: rem(20);
      grid-area: link;
      border: none;
      text-align: center;
      line-height: 1.3;
      color: $color--primary;
      background-color: transparent;
    }

    &__qrcode {
      grid-area: qrcode;
      padding-left: 20px;
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
