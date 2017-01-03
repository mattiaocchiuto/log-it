var webpack = require('webpack');

var libraryName = 'LogIt';
var fileName = 'index';

module.exports = [
    {
        name: 'index',
        entry: {
            index: './src/index.js',
        },
        devtool: 'source-map',
        output: {
            path: __dirname,
            filename: 'dist/[name].min.js',
            libraryTarget: 'umd',
            library: libraryName,
            umdNamedDefine: true
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'stage-2'],
                    }
                }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: { 
                    warnings: false,
                },
                mangle: false,
            }),
        ],
    },
    {
        name: 'logger_worker',
        entry: {
            'logger_worker': './src/logger_worker.js',
        },
        output: {
            path: __dirname,
            filename: 'dist/[name].min.js',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'stage-2'],
                    }
                }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: { 
                    warnings: false,
                },
            }),
        ],
    },
];
