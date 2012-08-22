Ceaseless
=========

Ceaseless.js enhances the Less.js compiler.
It provides command line option `--watch`, like the one in the SASS.

### Why

Less.js isn't easy to use. To compile some `.less` file, you have to do this:

```bash
$ lessc foo.less > foo.css
```

But I'd prefer:

```bash
$ lessc foo.less                    # generate foo.css respectively
```

Besides, Less.js does not support fancy features like live compiling,
Which I enjoyed alot whilst using the sass gem from the Ruby land.

So here's this npm module.

### Install

Just `$ npm install -g ceaseless`, you are good to go.

### Usage

To compile some less files

```bash
$ ceaseless assets/css/foo.less     # compile single file
$ ceaseless assets/css/             # compile all *.less files under some dir
```

Go live

```bash
$ ceaseless --watch assets/css/     # watch for file modifications, creations or deletions
```

