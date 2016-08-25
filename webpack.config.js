let webpack = require('webpack'),
    pkg = require('./package.json'),
    name = pkg.name.match(/-(\S*)/)[1];

module.exports = {
    devtool: 'source-map',
    entry: {
        'scheduler-client': './public/js/app.js'
    },
    output: {
        filename: './public/build/' + name + '-all.js',
        sourceMapFilename: './public/build/' + name + '-all.map?_v=[hash]',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-runtime', 'transform-class-properties', 'transform-object-rest-spread'],
                    presets: ['es2015']
                }
            },
            {
                test: /\.jsx/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-runtime', 'transform-class-properties', 'transform-object-rest-spread'],
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};
