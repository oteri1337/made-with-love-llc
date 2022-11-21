const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function rp(apath) {
  return path.resolve(__dirname, apath);
}

const entryOne = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "/assets/css/reactapp.css",
    }),
    new webpack.DefinePlugin({
      PWA_NAME: JSON.stringify(process.env.NODE_NAME),
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
      MAIL_NAME: JSON.stringify(process.env.MAIL_USERNAME),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/assets/images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/assets/fonts/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            query: {
              presets: ["react-app"],
            },
          },
        ],
        exclude: /(node_modules)/,
      },
    ],
  },
  output: {
    path: rp("../public_html/"),
    filename: "assets/javascript/reactapp.js", // must be relative path
  },
  entry: "./src/index.js",
  resolve: {
    alias: {
      assets: rp("src/assets/"),
      hooks$: rp("src/hooks.js"),
      functions: rp("src/providers/functions/"),
      providers: rp("src/providers/"),
      components: rp("src/pages/components/"),
    },
  },
};

module.exports = [entryOne];
