'use strict';

const Fs = require('fs');
const Path = require('path');
const Async = require('async');

const targetPath = Path.join(__dirname, 'config');

Async.waterfall([
  (next) => {
    Fs.readdir(targetPath, (error, files) => {
      if (error) {
        return next(error);
      }

      files = files.filter((file) => {
        return file.indexOf('.example') > 0;
      });

      next(null, {files: files});
    })
  },

  (trasnport, next) => {
    if (!trasnport.files) {
      next(null);
    }

    trasnport.files.forEach((file) => {
      const srcPath = Path.join(targetPath, file);
      const dstPath = srcPath.replace('.example', '');

      if (Fs.existsSync(dstPath)) {
        return console.log('Skipping', file, '(file already exists).');
      }

      console.log('Creating', file);
      Fs.copyFileSync(srcPath, dstPath);
    });
  }
], (error) => {

});
