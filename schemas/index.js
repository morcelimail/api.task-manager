'use strict';

const Fs = require('fs');
const Path = require('path');

const result = {};

Fs
.readdirSync(__dirname)
.filter(file => file !== 'index.js')
.forEach(function(file) {
  result[file.replace('.js', '')] = require(Path.join(__dirname, file));
});

module.exports = result;
