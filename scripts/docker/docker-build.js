const version = require('../version.js');
const sh = require('shelljs');

const imageName = 'sb-clean-blog-angular';

sh.exec(`docker build -t ${imageName}:latest -t ${imageName}:${version} .`);

