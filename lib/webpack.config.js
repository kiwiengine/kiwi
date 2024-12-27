import path from "path";
const config = {
    entry: {
        "sprite-test": "./docs/sprite-test.ts",
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
        path: path.resolve("docs"),
    },
};
export default config;
//# sourceMappingURL=webpack.config.js.map