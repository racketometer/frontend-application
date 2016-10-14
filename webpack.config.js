var bundler = require("nativescript-dev-webpack");
var webpack = require("webpack");

// Collect the IP address for the GraphQL host from environment variable IP
var IP = process.env.IP;

if (!IP) {
  throw Error("GraphQL IP address not set. Set environment variable 'IP'");
}

module.exports = bundler.getConfig({
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        IP: JSON.stringify(IP),
      },
    }),
  ]
});
