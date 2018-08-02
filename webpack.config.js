const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    entry: [
      './src/quill.mention.js',
    ],
    output: {
      filename: 'quill.mention.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'umd',
    },
    devServer: {
      contentBase: './src',
    },
    externals: {
      quill: 'quill',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            }],
          }),
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new UglifyJSPlugin({
        extractComments: true,
      }),
      new ExtractTextPlugin('quill.mention.css'),
    ],
  },
];
