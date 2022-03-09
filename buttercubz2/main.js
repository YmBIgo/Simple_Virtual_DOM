import createElement from "./createElement.js"
import render from "./render.js"
import insertElement from "./insert.js"
import diff from "./diff.js"

let myElement = createElement("div", {
	attrs: {id: "container"},
	children: [createElement("img", {
			attrs: {id: "img", src: "https://storage.googleapis.com/megufuji_images/TopPageImageGallery/rooms/Double1.jpg"},
			children: []
		})
	]
})

const megufuji_photos = ["https://storage.googleapis.com/megufuji_images/TopPageImageGallery/rooms/Double1.jpg", "https://storage.googleapis.com/megufuji_images/TopPageImageGallery/rooms/Double2.jpg", "https://storage.googleapis.com/megufuji_images/TopPageImageGallery/rooms/Twin1.jpg", "https://storage.googleapis.com/megufuji_images/TopPageImageGallery/rooms/Twin2.jpg", "https://storage.googleapis.com/megufuji_images/TopPageImageGallery/rooms/Family1.jpg", "https://storage.googleapis.com/megufuji_images/TopPageImageGallery/rooms/Family2.jpg"]

let element = render(myElement)
let rootElement = insertElement(element, document.querySelector("#root"))

let count = 0;

setInterval(() => {
	count = Math.floor(Math.random()*6)
	let myVirtualElement = createElement('div', {
		attrs: {class: 'img'},
		children: [createElement('img', {
			attrs: {id: 'img', src: megufuji_photos[count], onclick: () => alert("hoge")},
			children: []
		})]
	})
	const patch = diff(myElement, myVirtualElement)

	rootElement = patch(rootElement)

	myElement = myVirtualElement;
}, 1000)