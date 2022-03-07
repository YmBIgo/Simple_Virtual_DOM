import {
	CREATE,
	REPLACE,
	UPDATE,
	REMOVE,
	SET_PROP,
	REMOVE_PROP
} from "./consts"

const isNull = obj => obj === undefined || obj === null

const diffVNodeChildren = (oldVNode, newVNode) => {
	const patchs = []
	const len = Math.max(oldVNode.children.length, newVNode.children.length)
	for (let i = 0; i < len; i++) {
		patchs[i] = diff(oldVNode.children[i], newVNode.children[i])
	}
	return patches
}

const diffVNodeAttrs = (oldVNode, newVNode) => {
	const patchs = []
	const oldVNodeAttrs = oldVNode.attrs
	const newVNodeAttrs = newVNode.attrs
	const attrs = Object.assign({}, oldVNodeAttrs, newVNodeAttrs)

	Object.keys(attrs).map(key => {
		const oldValue = oldVNodeAttrs[key]
		const newValue = newVNodeAttrs[key]

		if (oldValue !== newValue) {
			patchs.push({type: SET_PROP, key, value: newValue})
		}
		if (!newValue) {
			patchs.push({type: REMOVE_PROP, key})
		}
	})
	return patchs
}

const isDifferentVNode = (oldVNode, newVNode) => {
	return (
		(typeof oldVNode !== 'object' && oldVNode !== newVNode) ||
				(typeof newVNode !== 'object' && oldVNode !== newVNode) ||
				oldVNode.tagName !== newVNode.tagName
	)
}

export default function diff(oldVNode, newVNode) {
	if (isNull(oldVNode)) {
		return {type: CREATE, newVNode}
	}

	if (isNull(newVNode)) {
		return {type: REMOVE}
	}

	if (isDifferentVNode(oldVNode, newVNode)) {
		return {type: REPLACE, newVNode}
	}

	if (newVNode.tagName) {
		return {
			type: UPDATE,
			children: diffVNodeChildren(oldVNode, newVNode),
			attrs: diffVNodeAttrs(oldVNode,newVNode)
		}
	}
}




