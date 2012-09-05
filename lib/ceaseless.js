var path  = require('path'),
    less = require('less'),
    fs = require('fs')

var _root = process.cwd()

// console methods wrappers
function say() {
    console.log.apply(this, arguments)
}

function yell() {
    console.warn.apply(this, arguments)
}

function lessc(file) {
    var code = fs.readFileSync(file, 'utf8'),
        css_file = file.replace(/\.less$/, '.css'),
        parser

    parser = new (less.Parser)({
        paths: [path.dirname(file)],
        filename: file
    })
    parser.parse(code, function(error, tree) {
        if (error) {
            less.writeError(error)
        }
        else {
            try {
                say('Updated file', css_file)
                fs.writeFileSync(css_file, tree.toCSS(), 'utf8')
            }
            catch (e) {
                less.writeError(e)
            }
        }
    })
}

// dir might be a file
// but that's fine
function watch(dir) {
    say('Started watching', dir)
    watcher = require('watch-tree-maintained').watchTree(dir, {
        'sample-rate': 5,
        'match': /\.less$/
    });
    watcher.on('fileDeleted', function(file) {
        file = file.replace(/\.less$/, '.css')
        if (fs.existsSync(file)) {
            fs.unlinkSync(file)
            say('Removed file', file)
        }
    });
    watcher.on('fileModified', function(file, stat) {
        lessc(file)
    })
    watcher.on('fileCreated', function(file, stat) {
        lessc(file)
    })
}

// file might be a dir
// yeah, i know. that's a lousy variable name
function compile(file) {
    var stat,
        files, dir,
        i, len

    file = path.resolve(_root, file)
    stat = fs.lstatSync(file)
    if (stat.isDirectory()) {
        dir = file
        files = fs.readdirSync(dir)
        for (i = 0, len = files.length; i < len; i++) {
            file = files[i]
            file = path.resolve(dir, file)
            compile(file)
        }
    }
    else if (/\.less$/.test(file)) {
        lessc(file)
    }
}

exports.watch = function(dir) {
    dir = path.resolve(_root, dir)

    if (fs.existsSync(dir)) {
        watch(dir)
    }
    else {
        yell('Error: cannot find', dir, 'to watch')
    }
}

exports.compile = function(files) {
    var i, len = files.length,
        file;

    for (i = 0; i < len; i++) {
        file = files[i]
        if (!fs.existsSync(file)) {
            say('Can not find file', file)
            continue
        }
        compile(file)
    }
}