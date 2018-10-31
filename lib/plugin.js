const { resolve, basename, extname, dirname } = require('path')
const { readdirSync, readFileSync } = require('fs')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = path => {
  const sources = [resolve(__dirname, '..', 'src', 'icons', '*.svg')]
  const icons = readdirSync(resolve(__dirname, '..', 'src', 'icons'))
  if (path) {
    if (Array.isArray(path)) {
      sources.push(...path)
      path.map(pathItem => icons.push(...readdirSync(dirname(pathItem))))
    } else {
      sources.push(path)
      icons.push(...readdirSync(dirname(path)))
    }
  }
  return [
    new CopyPlugin([
      resolve('node_modules', '@webcomponents', 'webcomponentsjs', 'webcomponents-loader.js'),
      {
        from: resolve('node_modules', '@webcomponents', 'webcomponentsjs', 'bundles', '*.js'),
        to: 'bundles',
        flatten: true
      }
    ]),
    new SVGSpritemapPlugin({
      src: sources,
      filename: 'icons.svg',
      prefix: 'cx-',
      gutter: 0,
      generateTitle: false,
      generateUse: false
    }),
    new HTMLPlugin({
      filename: 'icons-reference.html',
      template: '!!html-webpack-plugin/lib/loader!' + resolve(__dirname, '..', 'src', 'reference.ejs'),
      xhtml: true,
      hash: true,
      inject: false,
      templateParameters: {
        icons: icons.filter(filename => filename.charAt(0) !== '.' && extname(filename) === '.svg').map(icon => basename(icon, '.svg').toLowerCase()),
        script: readFileSync(resolve(__dirname, '..', 'src', 'index.js'))
      }
    })
  ]
}
