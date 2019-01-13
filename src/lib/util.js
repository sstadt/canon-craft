
export const debounce = (func, wait, immediate) => {
	var timeout

	return function() {
		var context = this, args = arguments
		var later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}

		var callNow = immediate && !timeout

		clearTimeout(timeout)
		timeout = setTimeout(later, wait)

		if (callNow) func.apply(context, args)
	}
}

export const hash = (str) => {
  var hash = 0, i, chr

  if (str.length === 0) return hash

  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i)
    hash  = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }

  return hash
}

export const clone = (obj) => {
	return JSON.parse(JSON.stringify(obj))
}
