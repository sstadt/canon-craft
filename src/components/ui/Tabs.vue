
<template lang="pug">
  .tabs
    .tabs__nav-wrapper
      .tabs__nav
        button.tabs__nav__button(
          type="button", 
          v-for="tab in tabs", 
          :class="{ 'active': tab.active }", 
          @click="activate(tab)"
        )
          icon.tabs__nav__icon(v-if="tab.icon", :name="tab.icon", :size="iconSize")
          span {{ tab.heading }}
    .tabs__content
      slot
</template>

<script>
  import Icon from '@/components/ui/Icon.vue'

  export default {
    name: 'Tabs',
    components: { Icon },
    data() {
      return {
        tabs: []
      }
    },
    computed: {
      iconSize () {
        return (this.$mq === 'mobile') ? '18' : '9'
      }
    },
    methods: {
      addTab(newTab) {
        this.tabs.push(newTab)
      },
      removeTab(tab) {
        let index = this.tabs.findIndex(t => t.heading === tab.heading)
        this.tabs.splice(index, 1)
      },
      activate({ heading }) {
        this.tabs.forEach(function (tab) {
          tab.active = Boolean(heading === tab.heading)
        });
      }
    }
  }
</script>

<style lang="scss">
  $tabs-nav-color: $body-text--completed;
  $tabs-nav-color--hover: $color-gold;
  $tabs-nav-color--desktop: $body-text--completed;
  $tabs-nav-color--desktop--hover: $body-text--main;

  .tabs {
    @include mobile-only {
      display: flex;
    }

    &__nav {
      @include mobile-only {
        position: sticky;
        display: flex;
        flex-direction: column;
        top: 0;
        margin-left: -#{$grid-gutter / 2};
        min-height: 100vh;
        background-color: $body-bg--dark;
        box-shadow: inset -3px 0px 10px 3px rgba($color-black, 0.5);
      }

      @include tablet-up {
        margin-left: -8px;
        margin-right: -8px;
        margin-bottom: $content-gutter;
      }

      &__button {
        cursor: pointer;
        background-color: transparent;
        position: relative;
        line-height: 1.5;
        padding: 10px 12px;
        border-width: 0;
        border-style: solid;
        border-color: transparent;
        font-weight: bold;
        color: $tabs-nav-color;
        transition: 0.3s ease all;

        @include tablet-up {
          color: $tabs-nav-color--desktop;
          border-width: 0 0 2px 0;
          margin: 5px 8px;
          padding: 0;
        }

        .icon {
          fill: $tabs-nav-color;
        }

        &:hover {
          color: $tabs-nav-color--hover;

          .icon {
            fill: $tabs-nav-color--hover;
          }

          @include tablet-up {
            color: $tabs-nav-color--desktop--hover;

            .icon {
              fill: $tabs-nav-color--desktop--hover;
            }
          }
        }

        &:focus {
          outline: none;
        }

        &.active {
          color: $tabs-nav-color--hover;
          border-color: $tabs-nav-color--hover;

          .icon {
            fill: $tabs-nav-color--hover;
          }

          @include tablet-up {
            color: $tabs-nav-color--desktop--hover;
            border-color: $tabs-nav-color--desktop--hover;

            .icon {
              fill: $tabs-nav-color--desktop--hover;
            }
          }
        }

        span {
          @include mobile-only {
            display: none;
          }
        }
      }

      &__icon {
        @include tablet-up {
          margin-right: 4px;
        }
      }
    }
  }
</style>
