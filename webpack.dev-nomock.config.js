//定义为生产环境
process.env.NODE_ENV="dev";
const path = require("path");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const outputFolder = "dist";
module.exports = merge(common,{
    mode: "development",
    devtool: "source-map",//开发环境中最好的Devtool
    entry: {
        index: path.join(__dirname, "app/main.js")
    },
    output: {
        path: path.join(__dirname, outputFolder),
        filename: "[name].[hash:4].js",
        chunkFilename: '[name].[hash:4].js'
    },
    module: {
        rules: [
            
        ]
    },
    plugins: [
        new CleanWebpackPlugin([path.join(__dirname, outputFolder)]),
        new HtmlWebpackIncludeAssetsPlugin({ assets: [path.join("../dll", "dll.js")], append: false }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.join('dll', 'manifest.json'),
        })
    ] 
})