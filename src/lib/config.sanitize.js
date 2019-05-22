
export default {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'strong', 'em', 'ul', 'u', 's',
    'a', 'p', 'br', 
    'ul', 'ol', 'li',
    'img', 'span'
  ],
  allowedAttributes: {
    'a': [ 'href' ],
    'img': [ 'src' ],
    'span': [ 'class', 'data-mention-id', 'data-mention-type', 'contenteditable' ]
  }
}
