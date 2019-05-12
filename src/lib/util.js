
/**
 * Limit the frequenscy with which a function can fire
 * @param {function} func      Function to debounce
 * @param {integer}  wait      Debounce duration in milliseconds
 * @param {boolean}  immediate Call function immediately
 */
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

/**
 * Return the hash for a given string
 * @param {string} str The string to hash
 */
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

/**
 * Return a deep clone of promitive object values
 * @param {object} obj The object to clone
 */
export const clone = (obj) => {
	if (!obj) {
		console.error(`cannot clone ${obj}`)
		return null
	}

	return JSON.parse(JSON.stringify(obj))
}

export const getClassesFromString = (str) => {
	let classes = str || ''
	let classesObj = {}
	
	classes.split(' ').forEach(item => 
		classesObj[item] = true)

	return classesObj
}

/**
 * Handleize a given string
 * @param {string} str The string to handleize
 */
export const handleize = (str) => {
	return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '')
}

/**
 * Returns true if on iOS
 */
export const isIos = () => {
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
}

/**
 * Returns true is this is a PWA
 */
export const isInStandaloneMode = () => {
  return ('standalone' in window.navigator) && (window.navigator.standalone)
}

/**
 * Apply a VanillaJS event handler and detach the 
 * handler after the first event
 * @param {object} node DOM node to apply the event to
 * @param {string} type The event to listen for
 * @param {function} callback The callback function to execute on the event
 */
export const handleEventOnce = (node, type, callback) => {
	node.addEventListener(type, function(e) {
		e.target.removeEventListener(e.type, arguments.callee)
		return callback(e)
	});
}
