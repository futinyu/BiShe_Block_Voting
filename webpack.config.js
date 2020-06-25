const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: "./lib/web3.js",
    output: {
        filename: "web3.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new CopyWebpackPlugin([{ from: "./view/index.pug", to: "index.pug" }]),
    ],
    // devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
    module:{
        rules:[{
            test:/\.js$/,
            exclude:/node_modules/,
        }]
    }
};


