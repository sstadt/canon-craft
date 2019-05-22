
import { Mention } from 'tiptap-extensions'

export default class AutoFill extends Mention {
  get schema() {
    return {
      attrs: {
        id: {},
        label: {},
        type: {}
      },
      group: 'inline',
      inline: true,
      selectable: false,
      atom: true,
      toDOM: node => [
        'span',
        {
          class: this.options.mentionClass,
          'data-mention-id': node.attrs.id,
          'data-mention-type': node.attrs.type
        },
        node.attrs.label
      ],
      parseDOM: [
        {
          tag: 'span[data-mention-id]',
          getAttrs: dom => {
            const id = dom.getAttribute('data-mention-id')
            const label = dom.innerText.split(this.options.matcher.char).join('')
            return { id, label }
          }
        }
      ]
    }
  }
}
