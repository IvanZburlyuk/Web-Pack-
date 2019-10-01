const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}
// one page
// const PAGES_DIR = PATHS.src

// Pages 
// const PAGES_DIR = `${PATHS.src}/html`
// const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endWith('.html'))

module.exports = {

  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src
  },
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/'
  }, 
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'venders',
          test: /node_moduls/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules'
    },{
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    },{
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
      
    }, {
      test: /\.scss$/,
      use: [ 
        'style-loader',
        MiniCssExtractPlugin.loader, 
        {
          loader: 'css-loader',
          options: { sourceMap: true}
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` }}
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true}
        }
      ]  
    }]
  }, 
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`,  to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/static`, to: ''},
    ]),
  ],
}