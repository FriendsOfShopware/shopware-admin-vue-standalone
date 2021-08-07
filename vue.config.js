const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  runtimeCompiler: true,
  configureWebpack: config => {
    config.externals = {
      ...config.externals,
      /*'ace-builds': 'ace-builds',
      flatpickr: 'flatpickr',
      lodash: 'lodash',
      'md5-es': 'md5-es',
      dompurify: 'dompurify',
      twig: 'twig',
      uuid: 'uuid'*/
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      'src': path.resolve(__dirname, './src'),
      '~scss/variables': path.resolve(__dirname, './src/app/assets/scss/variables.scss'),
      '~scss/mixins': path.resolve(__dirname, './src/app/assets/scss/mixins.scss'),
      '~scss/global': path.resolve(__dirname, './src/app/assets/scss/global.scss'),
    };

    config.module.rules.push({
      test: /\.twig$/,
      loader: 'html-loader'
    });

    config.module.rules.push({
      test: /\.svg$/,
      include: [
        path.join(__dirname, './src/app/assets/icons/svg')
      ],
      loader: 'svg-inline-loader',
      options: {
        removeSVGTagAttrs: false
      }
    });

    config.plugins.push(new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/app/snippet'),
          to: path.resolve(__dirname, './dist/snippet')
        }
      ]
    }));
  },

  chainWebpack: config => {
    config.module
      .rule('svg')
      .test(() => false)
      .use('file-loader')
  }
};
