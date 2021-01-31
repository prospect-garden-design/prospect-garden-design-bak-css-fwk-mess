var sass = require('sass');
var Fiber = require('fibers');
var fs = require('fs');

const srcPathBase = 'src/';
const srcPathArr = [srcPathBase + 'primitive/primitive-light.scss'];
const outDir = 'dist/';

function generateOutputNameFromSrcPath(path) {
  const nameArr = path.split('/');
  return nameArr[nameArr.length - 1].split('.')[0];
  // return nameArr.pop();
  // return nameArr.split(' ').slice(-1)[0];
}

function startBuildStyles() {
  srcPathArr.forEach((path) => {
    // made up of 2 words, e.g. bootstrap-light
    const outputName = generateOutputNameFromSrcPath(path);
    const outputFile = outDir + outputName + '.css';
    const outDirPath = outDir;
    fs.existsSync(outDirPath) || fs.mkdirSync(outDirPath, { recursive: true });
    // console.log(outputFile);
    sass.render(
      {
        file: path,
        outFile: outputFile,
        sourceMap: true,
        importer: function (url, prev, done) {
          // ...
        },
        fiber: Fiber,
      },
      function (err, result) {
        fs.writeFile(outputFile, result.css, function (err) {
          if (err) return console.error(err);
          console.log(outputFile + ' has been saved!');
        });
        fs.writeFile(outputFile + '.map', result.map, function (err) {
          if (err) return console.error(err);
          console.log(outputFile + '.map has been saved!');
        });
      },
    );
  });
}

startBuildStyles();

// for quick test，要手动确认fs.writeFile路径对应的目录存在
// sass.render(
//   {
//     file: 'src/primitive/primitive-light.scss',
//     outFile: 'dist/output.css',
//     sourceMap: true,
//   },
//   function (error, result) {
//     if (!error) {
//       fs.writeFile('dist/output.css', result.css, function (err) {
//         if (err) return console.error(err)
//         console.log('output style file has been saved!');
//       });
//     }
//   },
// );
