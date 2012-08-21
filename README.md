Ceaseless
=========

Ceaseless.js enhances the Less.js compiler.
It provides command line option `--watch`, like the one in the SASS.

## Usage

To compile some less files

```bash
$ ceaseless assets/css/frontpage.less     # compile single file
$ ceaseless assets/css/                   # compile all *.less files under some dir
```

Go live

```base
$ ceaseless --watch assets/css/           # watch for modification, creation and deletion
```

