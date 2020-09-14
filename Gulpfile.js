const { src, dest, series, parallel, watch } = require('gulp')
const htmlmin = require('gulp-htmlmin')
const cleanPlugin = require('gulp-rimraf')
const sassPlugin = require('gulp-sass')
const processhtml = require('gulp-processhtml')
const tsPlugin = require('gulp-typescript')
const imageMin = require('gulp-imagemin')
const connect = require('gulp-connect')

const cleanAll = (cb) => {
    return src(["./build/**"], { read: false, allowEmpty: true }).pipe(cleanPlugin())
}

const scss = (cb) => {
    src(["./pages/**/styles/**/index.scss"]).pipe(sassPlugin()).pipe(dest("./build/pages/")).pipe(connect.reload())
    cb()
}

const lib = (cb) => {
    src(["./lib/*"]).pipe(dest("./build/lib/"))
    cb()
}

const ts = (cb) => {
    src(["./pages/**/script/**.ts", "./pages/**/script/**.tsx"]).pipe(tsPlugin({
        module: 'AMD',
        jsx: 'react',
        lib: ["DOM", "ESNext"],
        moduleResolution: "Node"
    })).pipe(dest("./build/pages/")).pipe(connect.reload())
    cb()
}

const html = (cb) => {
    src(["./pages/**/index.html"])
        .pipe(processhtml())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest("./build/pages/"))
        .pipe(connect.reload())
    cb()
}

const image = (cb) => {
    src(['./pages/**/*.jgp', './pages/**/*.png', './pages/**/*.jpeg']).pipe(imageMin()).pipe(dest("./build/pages/")).pipe(connect.reload())
}

const browser = (cb) => {
    connect.server({
        livereload: true
    })

    cb()
}

const build = series(cleanAll, parallel(html, scss, ts, lib, image))

exports.build = build

exports.default = function() {
    series(browser, build, (cb) => {
        watch(["./pages/**/*.scss"], scss)
        watch(["./pages/**/*.ts", "./pages/**/*.tsx"], ts)
        watch(["./pages/**/*.html"], html)
        watch(["./pages/**/*.png"], image)
        watch(["./pages/**/*.jpg"], image)
        watch(["./pages/**/*.jpeg"], image)
        cb()
    })()
}


