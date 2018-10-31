const { resolve } = require('path')
const AntIcons = require('./lib/plugin')
const browserslist = [
  'Last 3 Chrome versions',
  'Last 3 Firefox versions',
  'Last 3 Opera versions',
  'Last 3 Edge versions',
  'IE 11',
  '> 1%'
]

module.exports = {
  mode: 'production',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: browserslist
                    },
                    modules: false
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [...AntIcons()]
}
