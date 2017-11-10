const Path = require('path');
const Webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    process.BABEL_ENV = env;

    return {
        entry: {
            app: ['babel-polyfill', Path.join(__dirname, './web')]
        },
        plugins: [
            new CleanWebpackPlugin(['public']),
            new HtmlWebpackPlugin({}),
            new Webpack.NamedModulesPlugin(),
            new Webpack.HotModuleReplacementPlugin()
        ],
        output: {
            filename: '[name].bundle.js',
            path: Path.resolve(__dirname, 'public'),
            publicPath: '/'
        },
        resolve: {
            modules: ['node_modules', 'components'],
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader"
                }],
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true,
                        modules: true,
                        localIdentName: '[path][name]-[local]',
                        importLoaders: 1
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true,
                    }
                }]
            }]
        },

        devServer: {
            contentBase: Path.resolve(__dirname, 'public'),
            hot: true,
            historyApiFallback: true
        }
    };
};