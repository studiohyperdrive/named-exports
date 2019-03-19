# Named exports

Generate index files with named exports for your project.

## Features

* generate named exports in the folder of your choice
* supports TypeScript projects as well as ECMAScript module syntax

## Install

```
npm install -D @tom-odb/named-exports
```

or

```
yarn add @tom-odb/named-exports
```

## Usage

```
named-exports --dir=src --ext=.ts --fileName=public_api --timeout=10000 --clean=true --indent=space --indentSize=4
```

### Options

```
--dir
Set the root dir to generate an index file for. All files will be read recursively and any matching export patterns will be added to the index file.
(default .)

--ext
Set the extension of files to match.
(default .ts)

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
Choose indentation style ("string" or "tab").
(default string)

--indentSize
Choose indentation size.
(default 2)
```

## Contributing (Issue/PR)
Make sure to add your issue, question or feature request to the issue tracker and fire away!

## MIT LICENSE
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
