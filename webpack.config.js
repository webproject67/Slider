const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: './src/scripts/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'docs'),
    port: 9000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...glob.sync('./src/*.html').map((htmlFile) => {
      return new HtmlWebpackPlugin({
        filename: path.basename(htmlFile),
        template: htmlFile,
        inject: false,
      });
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon/*.{png,svg}'),
        to: path.resolve(__dirname, 'docs/img/favicon/[name].[ext]'),
      },
      {
        from: path.resolve(__dirname, 'src/favicon/*.{xml,webmanifest,ico}'),
        to: path.resolve(__dirname, 'docs/[name].[ext]'),
      },
      {
        from: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
        to: path.resolve(__dirname, 'docs/jquery.min.js'),
      },
      {
        from: path.resolve(__dirname, 'src/scripts/init.js'),
        to: path.resolve(__dirname, 'docs/init.js'),
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
