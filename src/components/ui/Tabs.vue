
<template lang="pug">
  .tabs(:class="{ 'tabs--sidebar': this.sidebar }")
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
    props: {
      sidebar: {
        type: Boolean,
        default: false
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
    &__nav {
      margin-left: -8px;
      margin-right: -8px;
      margin-bottom: $content-gutter;

      &__button {
        cursor: pointer;
        background-color: transparent;
        position: relative;
        line-height: 1.5;
        border-width: 0 0 2px 0;
        border-style: solid;
        border-color: transparent;
        font-weight: bold;
        transition: 0.3s ease all;
        padding: 0;
        color: $tabs-nav-color--desktop;
        margin: 5px 8px;

        .icon {
          fill: $tabs-nav-color;
        }

        &:hover {
          color: $tabs-nav-color--desktop--hover;

          .icon {
            fill: $tabs-nav-color--desktop--hover;
          }
        }

        &:focus {
          outline: none;
        }

        &.active {
          color: $tabs-nav-color--desktop--hover;
          border-color: $tabs-nav-color--desktop--hover;

          .icon {
            fill: $tabs-nav-color--desktop--hover;
          }
        }
      }

      &__icon {
        @include tablet-up {
          margin-right: 4px;
        }
      }
    }

    &--sidebar {
      @include mobile-only {
        display: flex;
      }

      .tabs {
        &__nav {
          margin-left: 0;
          margin-right: 0;
          padding-bottom: 0;

          @include tablet-up {
            margin-left: -8px;
            margin-right: -8px;
            margin-bottom: $content-gutter;
          }
          
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

          button {
            margin: 0;
            padding: 10px 12px;
            border-width: 0;
            color: $tabs-nav-color;

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
        }
      }

      .tab {
        @include mobile-only {
          padding-left: $grid-gutter / 2;
        }
      }
    }
  }
</style>
