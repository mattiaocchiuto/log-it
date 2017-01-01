var webpack = require('webpack');

var libraryName = 'LogIt';
var fileName = 'index';

module.exports = {
    entry: {
        index: './src/index.js',
        'logger_worker': './src/logger_worker.js',
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
};
