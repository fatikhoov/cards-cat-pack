const path = require('path')

module.exports = {
  entry: {
    main: './dist/js/index.js',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
  },

  mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
}
