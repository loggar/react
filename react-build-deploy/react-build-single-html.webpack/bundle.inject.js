//Load the library and specify options

const fs = require("fs").promises;
const replace = require("replace-in-file");

const injectScript = async (indexFile, jsFile) => {
  try {
    const data = await fs.readFile(jsFile, "utf8");

    const options = {
      files: indexFile,
      from: '<script src="build/static/js/bundle.min.js">',
      to: "<script>" + data,
    };

    replace(options)
      .then((results) => {
        console.log("Replacement results:", results);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

injectScript(
  "dist/index.html",
  "dist/build/static/js/bundle.min.js"
).then((v) => console.log(v));
