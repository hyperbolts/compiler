# HyperBolts Compiler
**Part of the [HyperBolts](https://hyperbolts.io) family, developed by [Pace IT](https://www.paceit.co.uk). Contact us for bespoke development, consultancy and commercial support options.**

**Looking for a new role working with cutting edge tools and technologies? [We're hiring!](https://www.paceit.co.uk/contact/developer-jobs)**

## Summary
The HyperBolts compiler is an opinionated JavaScript bundler, asset compiler and watcher with built-in support for React hot loading. It provides a robust development environment for React projects, with out of the box support including:

- JavaScript bundling (using Webpack)
- React hot loading
- Local webserver
- Synchronised browser testing (BrowserSync)
- ES6 to ES5 transpiling (Babel)
- SASS compiling
- Image minification
- Watch code for changes

## Installation
To install the latest stable version, run the following commands at the root of your project:

```
npm install -g gulp
npm install --save gulp hyperbolts-compiler
```

Then create a file named `gulpfile.js`, contaning:

```
require('hyperbolts-compiler').run();
```

## Usage
```
gulp --watch
```

Remove the `--watch` flag to output built code only.

## Configuration
The following code sources/destinations are configured by default:

| Type        | Source                             | Destination
|:----        |:------                             |:-----------
| **Base**    |                                    | dist
| **Bundles** | src/index.jsx                      | bundle.js
| **Images**  | assets/images/**                   | assets/images
| **Static**  | assets/fonts/**                    | assets/fonts
|             | assets/public/**                   | /
| **Styles**  | assets/styles/**/[^_]*.{sass,scss} | assets/styles

Configuration can be overridden by passing a config object when calling `.run()`. For example:

```
require('hyperbolts-compiler').run({
    bundle: {
        src:  'src/index.jsx',
        dest: 'dist/bundle.js'
    }
});
```

Multiple sources are also supported with the following syntax:

```
require('hyperbolts-compiler').run({
    bundle: [
        {
            src:  'src/frontend/index.jsx',
            dest: 'dist/frontend.js'
        },
        {
            src:  'src/backend/index.jsx',
            dest: 'dist/backend.js'
        }
    ]
});
```

You can also pass a watch key to monitor something other than the source. See the [default config](https://github.com/hyperbolts/compiler/blob/master/src/config.js) file for more information.

## Quickstart
Let's build a "hello world" example from scratch to show how easy it is to develop with this compiler! Complete the installation steps above, then install React:

```
npm install --save react react-dom
```

Now create the application entry point at `src/index.jsx`, containing:

```
import React    from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('__react_mount')
);
```

Finally, create an index file at `assets/public/index.html` to the generated bundle:

```
<!DOCTYPE html>
<html>
    <body>
        <div id="__react_mount" />
        <script src="bundle.js"></script>
    </body>
</html>
```

Now run the compiler with `--watch`:

```
gulp --watch
```

Try changing the hello world message, your changes will be injected in real time. Magic!

## Troubleshooting
- **I'm getting errors about babel-loader when using npm2. What have I done wrong?**  
npm2 resolves dependencies differently to npm3. To fix, run the following command:

  ```
  npm install --save babel-loader babel-preset-latest babel-preset-react react-hot-loader webpack-dev-middleware webpack-hot-middleware webpack-module-hot-accept
  ```

- **My file changes are not being picked up?**  
See [Webpack documentation](https://webpack.github.io/docs/troubleshooting.html#watching) for possible issues.

## Change Log
This project adheres to [Semantic Versioning](http://semver.org/). Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/hyperbolts/compiler/releases) page.

## License
The MIT License (MIT)

Copyright © 2015-present Pace IT Systems Ltd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
