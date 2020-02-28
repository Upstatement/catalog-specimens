const moveFile = require('move-file');
const fs = require('fs');

const files = [
  'code-docs',
  'code-tabbed',
  'color-block',
  'comment',
  'edit-reminder',
];

files.forEach(file => {
(async () => {
    await moveFile(`dist/${file}/specimen.js`, `dist/${file}.js`);
    console.log('The file has been moved');

    const pathToDir = `./dist/${file}`;
    fs.rmdir(pathToDir, function(err) {
      if (err) {
        throw err
      } else {
        console.log("Successfully removed the empty directory!")
      }
    });
  })();
});
