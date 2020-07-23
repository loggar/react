# Bundle React App in a Single File with Gulp

```
npx create-react-app react-single-file-build.gulp

cd .\react-single-file-build.gulp\

npm install --save-dev gulp gulp-inline-source gulp-replace
```

`.env`

```
INLINE_RUNTIME_CHUNK=false
GENERATE_SOURCEMAP=false
SKIP_PREFLIGHT_CHECK=true
```

`gulpfile.js`

```js
const gulp = require("gulp");
const inlinesource = require("gulp-inline-source");
const replace = require("gulp-replace");

gulp.task("default", () => {
  return gulp
    .src("./build/*.html")
    .pipe(replace('.js"></script>', '.js" inline></script>'))
    .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
    .pipe(
      inlinesource({
        compress: false,
        ignore: ["png"],
      })
    )
    .pipe(gulp.dest("./build"));
});
```

create an optimized production build and bundle all the JS and CSS files:

```
npm run build 
npx gulp

# or

npx react-scripts build 
npx gulp

```
