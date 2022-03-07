export function setAttribute(target, key, value) {
	if (key === "className") {
		key = "class"
	}
	target.setAttribute(key, value)
}

export function removeAttribute(target, key) {
	if (key === "className") {
		key = "class"
	}
	target.removeAttribute(key)
}

function setAttribute(target, attrs) {
	Object.keys(attrs).forEach(key => {
		setAttribute(target, key, attrs[key])
	})
}

export function createElement(vnode) {
	if (typeof vnode !== 'object') {
		return document.createTextNode(vnode)
	}
	const el = document.createElement(vnode.tagName)
	setAttributes(el, vnode.attrs)
	vnode.children.map(createElement).forEach(el.appendChild.bind(el))
	return el
}

export default function render(vnode, parent) {
	parent = typeof parent === "string" ? document.querySelector(parent) : parent
	return parent.appendChild(createElement(vnode))
}