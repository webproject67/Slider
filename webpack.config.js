const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: './src/scripts/index.ts',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 9000,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CleanWebpackPlugin(),
    ...glob.sync('./src/pug/pages/**/*.pug').map((htmlFile) => {
      return new HtmlWebpackPlugin({
        filename: `${path.basename(htmlFile, path.extname(htmlFile))}.html`,
        template: htmlFile,
        inject: true,
      });
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/favicon/*.{png,svg}'),
        to: path.resolve(__dirname, 'public/img/favicon/[name].[ext]'),
      },
      {
        from: path.resolve(
          __dirname,
          'src/assets/favicon/*.{xml,webmanifest,ico}'
        ),
        to: path.resolve(__dirname, 'public/[name].[ext]'),
      },
    ]),
    new ImageminPlugin({
      test: /\.svg$/i,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devtool: 'source-map',
};
