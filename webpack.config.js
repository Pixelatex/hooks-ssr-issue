module.exports = {
  entry: "./src/app.js",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  externals: {
    // Use external version of React
    react: "React"
  },
  target: "node",
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  output: {
    libraryExport: "default",
    libraryTarget: "commonjs-module"
  },
  devServer: {
    host: "localhost",
    port: 3001,
    hot: true
  }
};
