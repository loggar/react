require("./deploy.env");

const path = require("path");
const rmdir = require("rmdir");
const copydir = require("copy-dir");

process.env.LOG_DIR = process.env.LOG_DIR || path.resolve(__dirname, "./_log");
process.env.PROCESS_NAME =
  process.env.PROCESS_NAME ||
  (function() {
    var dirs = __dirname.split(path.sep);
    return dirs[dirs.length - 1];
  })();
process.env.DEPLOY_TARGET =
  process.env.DEPLOY_TARGET || "no-such-dir";

const env_mode = process.env.NODE_ENV || "development";
const process_name = process.env.PROCESS_NAME;
const logger = require("../../../../../../_library/lib/logger.winston").init(
  env_mode,
  __filename,
  path.resolve(process.env.LOG_DIR, process_name + ".log")
);

const app_build_path = path.join(__dirname, "./build");
const app_deploy_path = path.join(
  __dirname,
  "../" + process.env.DEPLOY_TARGET + "/public_app"
);

rmdir(app_deploy_path, function(err, dirs, files) {
  if (err) {
    logger.error(err);
  } else {
    logger.info("rm dirs", dirs);
    logger.info("rm files", files);
  }
  copydir(
    app_build_path,
    app_deploy_path,
    {
      utimes: true, // keep add time and modify time
      mode: true, // keep file mode
      cover: true // cover file when exists, default is true
    },
    function(err) {
      if (err) {
        logger.error(err);
      } else {
        logger.info(app_build_path + " copied to " + app_deploy_path);
      }
    }
  );
});
