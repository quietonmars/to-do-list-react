'use strict';

const {transform} = require('@babel/core');
const jestPreset = require('babel-preset-jest');

module.exports = {
  process(src, filename) {
    console.log(`Transforming: ${filename}`);
    const result = transform(src, {
      filename,
      presets: [jestPreset],
    });

    return result || src;
  },
};