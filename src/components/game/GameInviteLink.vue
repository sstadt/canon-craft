
<template lang="pug">
  .game-invite.callout
    p.game-invite__title Send players this link or scan the image to invite them to the game
    input.game-invite__link.u-hidden-mobile-only#game-invite-link(type="text", v-model="inviteLink", readonly)
    .game-invite__qrcode
      qrcode-vue(:value="inviteLink")
    .game-invite__btn.game-invite__btn--reset
      primary-button(label="Reset Link", :text="true", :disabled="!hasInviteLink", @click="resetLink")
    .game-invite__btn.game-invite__btn--copy
      primary-button(label="Copy Link", :text="true", @click="copyLink")
</template>

<script>
  import QrcodeVue from 'qrcode.vue'

  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'

  export default {
    name: 'GameInviteLink',
    components: { QrcodeVue, PrimaryButton },
    props: {
      slug: String,
      game: String
    },
    computed: {
      hasInviteLink () {
        return this.slug.length > 0
      },
      inviteLink () {
        return `${window.location.origin}/join/${this.slug}`
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
    max-width: 525px;
    grid-template-areas: "qrcode title title"
                         "qrcode title title"
                         "qrcode reset copy";
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;

    @include tablet-up {
      margin-bottom: $grid-gutter;
      grid-template-areas: "link link qrcode"
                           "title title qrcode"
                           "reset copy qrcode";
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 1fr 0.5fr;
    }

    &__title {
      text-align: center;
      grid-area: title;
      margin: 0;
      font-size: rem(14);

      @include mobile-only {
        padding: 0 10px;
        display: flex;
        align-items: center;
      }
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
      padding: 0 20px 0 0;

      @include tablet-up {
        padding: 0 0 0 20px;
      }
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

      @include mobile-only {
        align-items: flex-start;
        text-align: center;
      }
    }
  }
</style>
