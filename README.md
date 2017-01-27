# HyperBolts Compiler
Part of the [HyperBolts](https://hyperbolts.io) family, developed by [Pace IT](https://www.paceit.co.uk). Contact us for bespoke development and commercial support options.

## Summary
The HyperBolts compiler is an opinionated JavaScript bundler, asset compiler and watcher with built-in support for React hot loading. 
Built on top of Gulp, it provides a robust development environment for React projects. Out of the box support includes:

- JavaScript bundling using Webpack
- React hot loading
- Local webserver
- Synchronised browser testing
- ES6 to ES5 transpiling
- SASS compiling
- Image minification
- Watch code for changes

## Installation
To install the stable version, run the following commands at the root of your project:

```
npm install -g gulp
npm install --save gulp hyperbolts-compiler
```

Next, add a file named `gulpfile.js` with the following content:

```
require('hyperbolts-compiler').run();
```

## Usage
```
gulp --watch
```

Remove `--watch` flag to output built code only.

## Configuration
The following code sources/destinations are configured by default:

| Type        | Source                                                                                   | Destination
|:----        |:------                                                                                   |:-----------
| **Bundles** | src/index.jsx                                                                            | dist/bundle.js
| **Images**  | assets/images/**/*.{gif,ico,jpeg,jpg,png,svg}                                            | dist/assets/images
| **Static**  | assets/fonts/**/*.{afm,cff,eot,ffil,fon,lwfn,otf,pfb,pfm,pro,std,svg,ttf,woff,woff2,xsf} | dist/assets/fonts
|             | assets/public/**                                                                         | dist
| **Styles**  | assets/styles/**/[^_]*.{sass,scss}                                                       | dist/assets/styles

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

You can also pass a watch key to monitor something other than the source (for example if you want to only compile SASS files not starting with underscore but watch all files). See the [default config](https://github.com/hyperbolts/compiler/blob/master/src/config.js) file for more information.

## Extending
To extend with custom functionality, add new gulp tasks as desired then create a new default task. The following tasks are run at startup by default:

- cleanup (before others)
- copy
- images
- styles
- bundle

Make sure to create the default task **after** calling `.run()`.

## Troubleshooting
- **I'm getting errors about babel-loader when using npm2. What have I done wrong?**
npm2 resolves dependencies differently than npm3. To fix, run the following command:

```
npm install --save babel-preset-latest babel-preset-react react-hot-loader webpack-dev-middleware webpack-hot-middleware webpack-module-hot-accept
```

## Change Log
This project adheres to [Semantic Versioning](http://semver.org/). Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/hyperbolts/compiler/releases) page.

## License
The MIT License (MIT)

Copyright (c) 2015-present Pace IT Systems Ltd

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
