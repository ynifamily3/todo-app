const { merge } = require("webpack-merge");
const dev = require("./webpack.config");
const config = {
  mode: "production",
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
        ],
        exclude: ["/node_modules"],
      },
    ],
  },
};
module.exports = merge(dev, config);
