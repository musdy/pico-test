/* eslint-disable spaced-comment */
/* eslint-disable no-global-assign */
global.__basedir = __dirname;
require = require('esm')(module /*, options*/);
module.exports = require('./src');
