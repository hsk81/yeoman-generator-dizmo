const { resolve } = require('path');

module.exports = {
    entry: {
        main: ['@babel/polyfill', './src/index.coffee']
    },
    module: {
        rules: [{
            test: /\.coffee$/i,
            exclude: [/node_modules/i],
            loader: 'coffee-loader'
        }, {
            test: /\.js$/i,
            exclude: [/node_modules/i, /\.(min|umd)\.js$/i],
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    cacheDirectory: true
                }
            }
        }]
    },
    output: {
        path: resolve(__dirname, 'build', '<%= dizmoName %>'),
        filename: 'index.js'
    },
    mode: 'none'
};
