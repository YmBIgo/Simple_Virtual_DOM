import {
	CREATE,
	REPLACE,
	UPDATE,
	REMOVE,
	SET_PROP,
	REMOVE_PROP
} from "./consts"
import {createElement, setAttribute, removeAttribute} from "./render"

const patchAttrs = (el, patches) => {
	for (const patch of patchs) {
		const { type, key } = patch

		if (type === SET_PROP) {
			setAttribute(el, key, patch.value)
		}

		if (type === REMOVE_PROP) {
			removeAttribute(el, key)
		}
	}
}

export default function patch(parent, patchs, index = 0) {
	if (!patches) {
		return
	}

	parent = typeof parent === "string" ? document.querySelector(parent) : parent
	const el = parent.childNodes[index]

	switch (patchs.type) {
		case CREATE: {
			const {newVNode} = patches
			const newEl = createElement(newVNode)
			parent.appendChild(newEl)
			break
		}
		case REPLACE: {
			const {newVNode} = patches
			const newEl = createElement(newVNode)
			parent.replaceChild(newEl, el)
			break
		}

		case REMOVE: {
			parent.removeChild(el)
			break
		}

		case UPDATE: {
			const {attrs, children} = patches

			patchAttrs(el, attrs)

			const sliceLen = 1000

			if (children.length > sliceLen) {
				let timer = null
				const step = start => {
					const label = `slice-${start}`
					console.time(label)
					let nodes = children.slice(start*sliceLen, (start+1)*sliceLen)
					for(let i = 0, len = sliceLen; i < len; i++){
						patch(el, node[i], i+start*sliceLen)
					}
					console.timeEnd(label)
					if (start >= Math.ceil(children.length/sliceLen)) {
						return cancelIdleCallback(timer)
					}
					start++
					timer = window.requestIdleCallback(() => step(start))
				}
				step(0)
			} else {
				for(let i = 0, len = children.length; i < len; i++) {
					patch(el, children[i], i)
				}
			}
			break
		}
	}
}
