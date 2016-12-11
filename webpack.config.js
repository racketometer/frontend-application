var bundler = require("nativescript-dev-webpack");
var webpack = require("webpack");

// Collect the backend URI for the GraphQL host from environment variable ROM_BACKEND_IP
var ROM_BACKEND_IP = process.env.ROM_BACKEND_IP;

if (!ROM_BACKEND_IP) {
  throw Error("GraphQL URI not set. Set environment variable 'ROM_BACKEND_IP'");
}

module.exports = bundler.getConfig({
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        ROM_BACKEND_IP: JSON.stringify(ROM_BACKEND_IP),
      },
    }),
  ]
});
