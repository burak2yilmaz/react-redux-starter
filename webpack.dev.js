var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    mode: 'none',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: "https://play.narkasa.com",
                secure: false
            },
        }
    },
    entry: {
        app: './src/index.js'
    },
    output: {
        path: __dirname + "/dist",
        publicPath: '/',
        filename: '[chunkhash].js'
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
                test: /\.(svg|eot|ttf|woff|woff2|png|jpe?g|gif)$/,
                use: 'file-loader'

            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                    'resolve-url-loader',
                    { loader: 'sass-loader', options: { sourceMap: true } },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('none')
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        })
    ]
};