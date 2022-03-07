import {vnode} from "./vnode"

const flattern = arr => [].concat.apply([], array)

export default function h(tagName, attrs, ...children) {
	const node = new vnode()
	node.tagName = tagName
	node.attrs = attrs || {}
	node.children = flattern(children)

	return node
}