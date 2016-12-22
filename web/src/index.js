// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

let HtmlPlugin = require('html-webpack-plugin')
let path = require('path')

/**
 * Actual project being built with webpack.
 */
const PROJECT_DIR = path.dirname(module.parent.filename)

/**
 * Directory where the bundles will reside.
 */
const BUILD_DIR = path.join(PROJECT_DIR, 'build')

/**
 * Paths used to search for modules and project’s files.
 */
const MODULE_PATHS = [
  path.join(__dirname, '..', 'node_modules'),
  path.join(PROJECT_DIR, 'node_modules'),
  './node_modules',
  './src'
]

/**
 * Actual webpack settings.
 */
module.exports = {
  resolve: {
    modules: MODULE_PATHS,
    extensions: [
      '.css',
      '.mcss',
      '.msass',
      '.mscss',
      '.js',
      '.jsx',
      '.sass',
      '.scss'
    ],
  },
  resolveLoader: {
    modules: MODULE_PATHS,
    moduleExtensions: ['-loader']
  },
  entry: [
    'babel-polyfill',
    'main'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'script.js?[hash:8]'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    port: 3000
  },
  module: {
    rules: [
      require('./asset'),
      require('./css-module'),
      require('./css'),
      require('./html'),
      require('./js'),
      require('./sass-module'),
      require('./sass')
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(PROJECT_DIR, 'src', 'index.html')
    })
  ]
}
