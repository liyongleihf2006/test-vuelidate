//定义为生产环境
process.env.NODE_ENV="prod";
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const outputFolder = "build";
module.exports = merge(common, {
    mode:"development",
    devtool:"source-map",
    entry:{
        index: path.join(__dirname, "app/main.js")
    },
    output:{
        path:path.join(__dirname,outputFolder),
        filename:"[name].[chunkhash:4].js",
        chunkFilename:'[name].[chunkhash:4].js'
        /* publicPath:"http://www.baidu.com/" */
    },
    module:{
        rules:[{
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        attrs: ['img:src', 'link:href', 'script:src', 'audio:src'],
                    },
                }],
                include: path.join(__dirname, 'public')
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name:"[path][name].[hash:4].[ext]"
                        }
                    },
                    {
                        loader: "extract-loader-path-correction"
                    },
                    {
                        loader: 'css-loader'
                    }
                ],
                include:[
                    path.join(__dirname, '/bower_components'),
                    path.join(__dirname, '/vendor')
                ]
            },{
                test: function(content){
                    return !/\.css$/.test(content);
                },
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[hash:4].[ext]'
                        }
                    }
                ],
                include:[
                    path.join(__dirname, '/bower_components'),
                    path.join(__dirname, '/vendor')
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {//node_modules内的依赖库
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    name: "node_modules",
                    minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 100,
                    // enforce: true?
                },
                common: {
                    chunks: "all",
                    test: /[\\/]app[\\/].*\.js/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
                    name: "common", //生成文件名，依据output规则
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 1
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin([path.join(__dirname,outputFolder)]),
        new webpack.BannerPlugin('没有版权,请任意使用'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        /* 
            压缩操作的时候所有的html css js json都进行gzip 
            所有的其他文件都不进行gzip压缩
            所以将来服务器端在向前端发送数据的时候,设置gzip的时候要根据文件后缀来决定
            发送的response header 的'Content-Encoding'是否值为'gzip',只有html
            css js json才会这样发送
            minRatio设置为非常大的值(1000)是为了让文件一定会被gzip
        */
        /* new CompressionPlugin({
            test:/\.(html|css|js|json)$/,
            deleteOriginalAssets:false,
            asset:"[file]",
            minRatio:1000
        }) */
    ]
})