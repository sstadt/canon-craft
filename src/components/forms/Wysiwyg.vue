
<template lang="pug">
  .wysiwyg
    editor-menu-bubble(:editor="editor")
      .menububble(slot-scope="{ commands, isActive, getMarkAttrs, menu }", :class="{ 'is-active': menu.isActive }", :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`")
        form.menububble__form(v-if="linkMenuIsActive", @submit.prevent="setLinkUrl(commands.link, linkUrl)")
          input.menububble__input(type="text", v-model="linkUrl", placeholder="https://", ref="linkInput", @keydown.esc="hideLinkMenu")
          button.menububble__button(type="button", @click="setLinkUrl(commands.link, null)")
            span.u-hidden Save Link
            icon(name="link", size="14")
        template(v-else)
          button.menububble__button(@click="showLinkMenu(getMarkAttrs('link'))", :class="{ 'is-active': isActive.link() }")
            span.u-hidden Add Link
            icon(name="link", size="14")
    editor-menu-bar(:editor="editor")
      .wysiwyg__controls(slot-scope="{ commands, isActive }")
        .wysiwyg__control-group
          wysiwyg-button(label="Bold", icon="bold", :size="iconSize", :class="{ 'is-active': isActive.bold() }", @click="commands.bold")
          wysiwyg-button(label="Italic", icon="italic", :size="iconSize", :class="{ 'is-active': isActive.italic() }", @click="commands.italic")
          wysiwyg-button(label="Underline", icon="underline", :size="iconSize", :class="{ 'is-active': isActive.underline() }", @click="commands.underline")
          wysiwyg-button(label="Strikethrough", icon="strikethrough", :size="iconSize", :class="{ 'is-active': isActive.strike() }", @click="commands.strike")
        .wysiwyg__control-group
          wysiwyg-button(label="H2", icon="h2", :size="headingIconSize", :class="{ 'is-active': isActive.heading({ level: 2 }) }", @click="commands.heading({ level: 2 })")
          wysiwyg-button(label="H3", icon="h3", :size="headingIconSize", :class="{ 'is-active': isActive.heading({ level: 3 }) }", @click="commands.heading({ level: 3 })")
        .wysiwyg__control-group
          wysiwyg-button(label="Unordered List", icon="unordered-list", :size="iconSize", :class="{ 'is-active': isActive.bullet_list() }", @click="commands.bullet_list")
          wysiwyg-button(label="Ordered List", icon="ordered-list", :size="iconSize", :class="{ 'is-active': isActive.ordered_list() }", @click="commands.ordered_list")
        .wysiwyg__control-group
          wysiwyg-button(label="Add Image", icon="image", :size="iconSize", @click="showImagePrompt(commands.image)")
    editor-content(:editor="editor")
    .suggestion-list(v-show="showSuggestions", ref="suggestions")
      template(v-if="hasSuggestionResults")
        .suggestion-list__item(
          v-for="(suggestion, index) in filteredSuggestions",
          :key="suggestion.id"
          :class="{ 'is-selected': navigatedSuggestionIndex === index }",
          @click="selectSuggestion(suggestion)"
        ) 
          icon.suggestion-list__icon(:name="suggestion.type", size="14px")
          span {{ suggestion.name }}
      .suggestion-list__item.suggestion-list__item--empty(v-else) No Suggestions Found
</template>

<script>
  import { mapState } from 'vuex'
  import Fuse from 'fuse.js'
  import tippy from 'tippy.js'

  import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
  import {
    Bold, Italic, Underline, Strike,
    Heading, ListItem, BulletList, OrderedList,
    Link, Image, Mention
  } from 'tiptap-extensions'
  import AutoFill from '@/lib/tiptap/AutoFill.js'

  import Icon from '@/components/ui/Icon.vue'
  import WysiwygButton from '@/components/buttons/WysiwygButton.vue'

  export default {
    name: 'Wysiwyg',
    components: { 
      EditorContent, EditorMenuBar, EditorMenuBubble, 
      Icon, WysiwygButton
    },
    props: {
      value: String
    },
    data () {
      return {
        editor: null,
        iconSize: '14px',
        headingIconSize: '17px',
        linkUrl: null,
        linkMenuIsActive: false,
        suggestionQuery: '',
        filteredSuggestions: [],
        suggestionRange: null,
        insertSuggestion: null,
        navigatedSuggestionIndex: 0
      }
    },
    computed: {
      ...mapState({
        games: state => state.games.all,
        allNpcs: state => state.npcs.all
      }),
      onGamePage () {
        return this.$route.name === 'game'
      },
      gameId () {
        return (this.onGamePage) ? this.$route.params.id : null
      },
      game () {
        return (this.gameId) ? this.games.find(game => game.id === this.gameId) : null
      },
      npcs () {
        return (this.game) ? this.allNpcs.filter(npc => npc.campaign === this.game.campaign) : []
      },
      suggestions () {
        return [].concat(this.npcs.map(npc => ({ type: 'npc', id: npc.id, name: npc.name })))
      },
      hasSuggestionResults () {
        return this.filteredSuggestions.length
      },
      showSuggestions () {
        return Boolean(this.suggestionQuery || this.hasSuggestionResults)
      }
    },
    mounted () {
      this.editor = new Editor({
        extensions: [
          new Bold(),
          new Italic(),
          new Underline(),
          new Strike(),
          new Heading({ levels: [2, 3] }),
          new ListItem(),
          new BulletList(),
          new OrderedList(),
          new Link(),
          new Image(),
          new AutoFill({
            items: this.suggestions,
            onEnter: this.suggestionStarted,
            onChange: this.suggestionChanged,
            onExit: this.suggestionCancelled,
            onKeyDown: this.suggestionNavigated,
            inFilter: this.suggestionFiltered
          })
        ],
        content: this.$sanitize(this.value),
        onUpdate: this.onUpdate
      })
    },
    beforeDestroy () {
      this.editor.destroy()
    },
    methods: {
      suggestionStarted ({ items, query, range, command, virtualNode }) {
        this.suggestionQuery = query
        this.filteredSuggestions = items
        this.suggestionRange = range
        this.renderPopup(virtualNode)
        this.insertSuggestion = command
      },
      suggestionChanged ({ items, query, range, virtualNode }) {
        this.suggestionQuery = query
        this.filteredSuggestions = items
        this.suggestionRange = range
        this.navigatedSuggestionIndex = 0
        this.renderPopup(virtualNode)
      },
      suggestionCancelled () {
        this.suggestionQuery = null
        this.filteredSuggestions = []
        this.suggestionRange = null
        this.navigatedSuggestionIndex = 0
        this.destroyPopup()
      },
      suggestionNavigated ({ event }) {
        switch (event.keyCode) {
          case 38:
            this.suggestionUp()
            return true
          case 40:
            this.suggestionDown()
            return true
          case 13:
            this.suggestionEnter()
            return true
          default:
            return false
        }
      },
      suggestionFiltered (items, query) {
        if (!query) {
          return items
        }

        const fuse = new Fuse(items, {
          threshold: 0.2,
          keys: ['name']
        })

        return fuse.search(query)
      },
      suggestionUp () {
        this.navigatedSuggestionIndex = (this.navigatedSuggestionIndex + this.filteredSuggestions.length - 1) % this.filteredSuggestions.length
      },
      suggestionDown () {
        this.navigatedSuggestionIndex = (this.navigatedSuggestionIndex + 1) % this.filteredSuggestions.length
      },
      suggestionEnter () {
        const suggestion = this.filteredSuggestions[this.navigatedSuggestionIndex]

        if (suggestion) this.selectSuggestion(suggestion)
      },
      renderPopup (node) {
        if (this.popup) {
          return
        }

        this.popup = tippy(node, {
          content: this.$refs.suggestions,
          trigger: 'mouseenter',
          interactive: true,
          theme: 'dark',
          placement: 'top-start',
          inertia: true,
          duration: [400, 200],
          showOnInit: true,
          arrow: true,
          arrowType: 'round'
        })

        if (MutationObserver) {
          this.observer = new MutationObserver(() => {
            this.popup.popperInstance.scheduleUpdate()
          })

          this.observer.observe(this.$refs.suggestions, {
            childList: true,
            subtree: true,
            characterData: true // letters, not player characters
          })
        }
      },
      destroyPopup () {
        if (this.popup) {
          this.popup.destroy()
          this.popup = null
        }

        if (this.observer) {
          this.observer.disconnect()
        }
      },
      selectSuggestion (suggestion) {
        this.insertSuggestion({
          range: this.suggestionRange,
          attrs: {
            id: suggestion.id,
            type: suggestion.type,
            label: suggestion.name
          }
        })
        this.editor.focus()
      },
      onUpdate ({ getHTML }) {
        let raw = getHTML()
        let html = this.$sanitize(raw)

        this.$emit('input', html)
      },
      showLinkMenu (attrs) {
        this.linkUrl = attrs.href
        this.linkMenuIsActive = true
        this.$nextTick(() => this.$refs.linkInput.focus())
      },
      hideLinkMenu () {
        this.linkUrl = null
        this.linkMenuIsActive = false
      },
      setLinkUrl (command, url) {
        command({ href: url })
        this.hideLinkMenu()
        this.editor.focus()
      },
      showImagePrompt (command) {
        let src = prompt('Enter the url of your image here')

        if (src != null) {
          command({ src })
        }
      }
    }
  }
</script>

<style lang="scss">
  .wysiwyg {
    position: relative;

    &__controls {
      display: flex;
    }

    &__control-group {
      display: flex;

      &:not(:last-child) {
        margin-right: 10px;
      }
    }

  }

  .menububble {
    position: absolute;
    display: flex;
    z-index: 20;
    background: #000;
    border-radius: 5px;
    padding: .3rem;
    margin-bottom: .5rem;
    transform: translateX(-50%);
    visibility: hidden;
    opacity: 0;
    transition: opacity .2s,visibility .2s;

    &.is-active {
      opacity: 1;
      visibility: visible;
    }

    &__button {
      display: inline-flex;
      background: rgba(0,0,0,0);
      border: 0;
      color: #fff;
      padding: .2rem .5rem;
      margin-right: .2rem;
      border-radius: 3px;
      padding: 6px;

      .icon {
        fill: $body-text--light;
      }

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        background-color: hsla(0,0%,100%,.1);
      }

      &.is-active {
        background-color: hsla(0,0%,100%,.2);
      }
    }

    &__form {
      display: flex;
      align-items: center;
    }

    &__input {
      border: none;
      background: rgba(0,0,0,0);
      color: $body-text--light;
    }
  }

  .suggestion-list {
    padding: 0.2rem;
    border: 2px solid rgba($color-black, 0.1);
    font-size: 0.8rem;
    font-weight: bold;

    &__no-results {
      padding: 0.2rem 0.5rem;
    }

    &__item {
      border-radius: 5px;
      padding: 0.2rem 0.5rem;
      margin-bottom: 0.2rem;
      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }

      &.is-selected,
      &:hover {
        background-color: rgba($color-white, 0.2);
      }

      &.is-empty {
        opacity: 0.5;
      }
    }

    &__icon {
      vertical-align: middle;
      margin-right: 4px;
      fill: $body-text--light !important;
    }
  }

  .tippy-tooltip.dark-theme {
    background-color: $color-black;
    padding: 0;
    font-size: 1rem;
    text-align: inherit;
    color: $color-white;
    border-radius: 5px;

    .tippy-backdrop {
      display: none;
    }

    .tippy-roundarrow {
      fill: $color-black;
    }

    .tippy-popper[x-placement^=top] & .tippy-arrow {
      border-top-color: $color-black;
    }

    .tippy-popper[x-placement^=bottom] & .tippy-arrow {
      border-bottom-color: $color-black;
    }

    .tippy-popper[x-placement^=left] & .tippy-arrow {
      border-left-color: $color-black;
    }

    .tippy-popper[x-placement^=right] & .tippy-arrow {
      border-right-color: $color-black;
    }
  }
</style>
