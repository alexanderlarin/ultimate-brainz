const Path = require('path');
const Webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
    process.BABEL_ENV = env;

    const production = env === 'production';

    const plugins = production ? [
        new UglifyJsPlugin({ sourceMap: true })
    ] : [
        new Webpack.NamedModulesPlugin(),
        new Webpack.HotModuleReplacementPlugin()
    ];

    const extractSass = new ExtractTextPlugin({
        filename: "[name].stylesheet.css",
        disable: !production
    });

    return {
        entry: {
            app: ['babel-polyfill', Path.join(__dirname, './web')]
        },
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
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[path][name]-[local]',
                            importLoaders: 1
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    }],

                    fallback: "style-loader"
                })
            }]
        },
        plugins: [
            new CleanWebpackPlugin(['public']),
            new HtmlWebpackPlugin({
                inject: false,
                template: require('html-webpack-template'),
                title: 'Ultimate-Brainz App',
                meta: [{
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0'
                }],
                links: [
                    'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css'
                ]
            }),
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
            extractSass
        ].concat(plugins),

        devtool: production ? 'source-map' : 'inline-source-map',

        devServer: {
            contentBase: Path.resolve(__dirname, 'public'),
            hot: true,
            historyApiFallback: true
        }
    };
};