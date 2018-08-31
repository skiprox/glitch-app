'use strict';

const fs = require('fs');

class Glitch {
	constructor(directoryPath) {
		fs.readdir(directoryPath, (err, files) => {
			files.forEach((file, index) => {
				if (file.indexOf('.png') !== -1 || file.indexOf('.jpg') !== -1) {
					this.callToRead(directoryPath, file, index);
				}
			});
		});
	}
	callToRead(directoryPath, file, index) {
		fs.readFile(`${directoryPath}${file}`, (err, buf) => {
			for (let i = 0; i < 20; i++) {
				buf[Math.floor(Math.random() * buf.length)] = buf[Math.floor(Math.random() * buf.length)];
			}
			fs.writeFileSync(`${directoryPath}${file}`, buf, (err) => {
				if (err) throw err;
			});
		});
	}
}

module.exports = Glitch;

