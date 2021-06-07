# @studiohyperdrive/named-exports

Generate index files with named exports for your project.

## Features

* generate named exports in the folder of your choice
* supports TypeScript projects as well as ECMAScript module syntax

## Install

```
npm install -D @studiohyperdrive/named-exports
```

or

```
yarn add @studiohyperdrive/named-exports
```

## Usage

```
named-exports --dir=src --ext=.ts --exclude=(ignore-this|ignore-that) --include=(include-this|include-that) --fileName=public_api --timeout=10000 --clean=true --indent=space --indentSize=4 --silent
```

### Options

```
--dir
Set the root dir to generate an index file for. All files will be read recursively and any matching export patterns will be added to the index file.
(default .)

--ext
Set the extension of files to match.
(default .ts)

--exclude
Exclude pattern passed to [node-glob](https://github.com/isaacs/node-glob), suffixed with provided ext.
(default *.spec|*.test|*-test|*-spec)

--include
Set the extensions of files to match. Include pattern passed to [node-glob](https://github.com/isaacs/node-glob).
(default ts|tsx)

--fileName
Set the name of the generated file.
(default index)

--timeout
Set a max timeout for the script to finish execution.
(default 30000)

--clean
Cleanup remaining index files from previous builds.
(default true)

--indent
Choose indentation style ("space" or "tab").
(default space)

--indentSize
Choose indentation size.
(default 2)

--silent
Disable logs.
```

## Contributing (Issue/PR)
Make sure to add your issue, question or feature request to the issue tracker and fire away!
