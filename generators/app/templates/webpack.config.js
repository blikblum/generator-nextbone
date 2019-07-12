const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')
const autoprefixer = require('autoprefixer')
const argv = require('webpack-nano/argv')

<%- require %>

const DIST_DIR = 'dist'
const devDevTool = 'source-map' // see https://webpack.js.org/configuration/devtool/ for options
const prodDevTool = false

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
  }),
]

const { mode = 'production' } = argv

const isProd = mode === 'production'

const entry = ['./src/main.js']

if (isProd) {
  plugins.push(new CleanWebpackPlugin())
  plugins.push(
    new GenerateSW({
      swDest: path.join('sw.js'),
    }),
  )
  plugins.push(
    new MiniCSSExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  )
} else {
  // dev
  plugins.push(
    new WebpackPluginServe({
      host: 'localhost',
      port: '8080',
      static: path.resolve(__dirname, DIST_DIR),      
      liveReload: true,
      hmr: false,
    }),
  )

  entry.push('webpack-plugin-serve/client')
}

module.exports = {
  entry,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, DIST_DIR),
  },
  mode,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: [path.resolve('src')],
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/,
        use: [isProd ? MiniCSSExtractPlugin.loader : 'style-loader', 'css-loader'],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          isProd ? MiniCSSExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: isProd,
              plugins: [autoprefixer()],
            },
          },
          'sass-loader',
        ],
      }
      <%- loaderBody %>
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, './src/common'), 'node_modules'],
  },
  plugins: plugins,
  devtool: isProd ? prodDevTool : devDevTool,
  watch: !isProd,
}
