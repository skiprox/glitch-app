// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');

class Renderer {
	constructor() {
		this.input = document.getElementById('folder');
		this.submit = document.getElementById('submit');
		this.onSubmit = this.onSubmit.bind(this);
		this.addListeners();
		if (window.confirm("This is potentially dangerous.\n\nThis will permanently change images on your computer.\n\nAre you sure you want to continue?")) {
		} else {
			ipcRenderer.sendSync('exit', 'exit');
		}
	}
	addListeners() {
		this.submit.addEventListener('click', this.onSubmit);
		ipcRenderer.on('error', (event, error) => {
			console.log(error);
			alert(error);
		});
	}
	onSubmit(e) {
		console.log('we fucking submit');
		e.preventDefault();
		ipcRenderer.sendSync('glitch-images', this.input.value);
	}
}

new Renderer();