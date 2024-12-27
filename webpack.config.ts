import path from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
  entry: {
    "sprite-test": "./test/sprite-test.ts",
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    extensionAlias: {
      ".js": [".js", ".ts"],
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve("test"),
  },
};

export default config;
