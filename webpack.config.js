var webpack = require('webpack');
var path = require('path');
var argv = require('optimist')
            .alias('r','release')
            .argv;

var config = {
  entry: { 'map': './src/main' },
  output:{
    path: './dist',
    filename:"map.js",
    // export itself to a global var
    libraryTarget: "var",
    // name of the global var: "Foo"
    library: "Map"
  },
  resolve: {
    root: 'src',
    moduleDirectories: ['node_modules']
  },
  devtool:'#eval',
  devServer: {
    publicPath: '/',
    contentBase: "dist",
  },
  module:{
    loaders:[
      { test: /\.css$/,             loader: "style-loader!css-loader" },
      { test: /\.less$/,            loader: "style-loader!css-loader!less-loader" },
      { test: /\.png$/,       loader: "file-loader?name=[path][name].[ext]&context=./src" },
      { test: /\.svg$/,             loader: "file-loader?name=[path][name].[ext]&context=./src" },
      { test: /\.html$/,       loader: "file-loader?name=[path][name].[ext]&context=./src" },
    ]
  },
  plugins:[
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require(path.join(process.cwd(),'package.json')).version),
      ENV: JSON.stringify(argv.env || 'dev')
    }),
  ]
};

if(argv.minify){
  delete config.devtool;
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle:true,
    compress:{
      drop_console:true
    },
    output: {
      comments: false
    }
  }));
  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(true)
  );
}

module.exports = config;