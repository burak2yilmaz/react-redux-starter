const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const variables = require('./src/helpers/variables');

module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: "[hash].js",
        publicPath: variables.url.APP
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: [
                    path.resolve(__dirname, "public/fonts")
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: "public/fonts",
                        publicPath: variables.url.APP + "/public/fonts"
                    }
                }]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: [
                    path.resolve(__dirname, "public/icons")
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: "public/icons",
                        publicPath: variables.url.APP + "/public/icons"
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: [
                    path.resolve(__dirname, "public/images")
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: "public/img",
                        publicPath: variables.url.APP + "/public/img"
                    }
                }]
            },
            {
                test: /\.(pdf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: [
                    path.resolve(__dirname, "public/docs")
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: "public/docs",
                        publicPath: variables.url.APP + "/public/docs"
                    }
                }]
            },
            {
                test: /\.(mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: [
                    path.resolve(__dirname, "public/sounds")
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: "public/sounds",
                        publicPath: variables.url.APP + "/public/sounds"
                    }
                }]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: '[hash].css'
        }),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new CopyPlugin([
            {from: "./public/.htaccess"},
            {from: "./public/robots.txt"},
            {from: "./public/manifest.json"},
            {
                from: "./public/static",
                to: "./static",
            }
        ])
    ]
};