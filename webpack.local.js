var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: "http://localhost:8080",
                secure: false
            },
        }
    },
    entry: {
        app: './src/index.js'
    },
    output: {
        path: __dirname + "/dist",
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2|png|jpe?g|gif|mp3)$/,
                use: 'file-loader'

            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'css-hot-loader',
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new MiniCssExtractPlugin({
            filename: '[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};