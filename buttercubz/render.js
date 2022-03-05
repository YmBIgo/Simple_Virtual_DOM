function render({tagName, attrs = {}, children = []}){
	let element = document.createElement(tagName);
	children.forEach(child => {
		if (typeof child === "string") {
			element.appendChild(document.createTextNode(child))
		} else {
			element.appendChild(render(child))
		}
	})
	if (Object.keys(attrs).length) {
		for (const [key, value] of Object.entries(attrs)){
			if (key[0] === "o" && key[1] === "n") {
				const eventName = key.slice(2)
				element.addEventListener(eventName, value)
			} else {
				element.setAttribute(key, value)
			}
		}
	}
	return element
}

export default render