const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const app_configs = {
  asset_dir: './dist/'
};

const config = {
  mode: 'none',
  entry: {
    index: './src/index.js',
    post: './src/post.js'
  },
  output: {
    filename: app_configs.asset_dir + 'js/[name].js',
    path: path.resolve(__dirname, './'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'dist/css/[name].css',
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/images',
        to: app_configs.asset_dir + 'images',
        toType: 'dir'
      }
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 9000,
    watchContentBase: true
  },
  watchOptions: {
    poll: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          'resolve-url-loader', // Resolve issue for relative path in scss
          "sass-loader?sourceMap"
        ]
      },
      {
        test: /\.(jp(e)?g|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: { // Options for url-loader and fallback file-loader
            limit: 8192,
            name: '[name].[ext]',
            outputPath: app_configs.asset_dir + 'css/images',
            publicPath: './images'
          }
        }
      }
    ]
  }

};

module.exports = config;