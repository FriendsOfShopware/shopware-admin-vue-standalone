const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname + './../index.js'),
  output: {
    path: path.resolve(__dirname + './../dist'),
    filename: 'main.js',
    libraryTarget: 'umd',
    library: 'main',
    umdNamedDefine: true
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      'src': path.resolve(__dirname, '../src'),
      '~scss/variables': path.resolve(__dirname, '../src/app/assets/scss/variables.scss'),
      '~scss/mixins': path.resolve(__dirname, '../src/app/assets/scss/mixins.scss'),
      '~scss/global': path.resolve(__dirname, '../src/app/assets/scss/global.scss'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(html|twig)$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}
