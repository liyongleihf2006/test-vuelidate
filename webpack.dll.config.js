const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const library = "dll";
module.exports = {
    output: {
        path: path.join(__dirname,'dll'),
        filename: '[name].js',
        libraryTarget:'umd',
        library:library,
    },
    entry: {
        dll: ['lodash','axios','vue','vuex','vue-router'],
    },
    mode:"development",
    plugins: [
        new CleanWebpackPlugin([path.join(__dirname,"dll")]),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dll','manifest.json'),
            // This must match the output.library option above
            name: "window."+library
        }),
    ],
}