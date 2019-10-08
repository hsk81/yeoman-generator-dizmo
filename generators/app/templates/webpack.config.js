const path = require('path');

module.exports = {
    entry: {
        main: ['@babel/polyfill', './src/index.js']
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [
                /\.min\.js$/, /\.umd\.js$/
            ],
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins: [
                    ],
                    cacheDirectory: true
                }
            }
        }]
    },
    output: {
        path: path.resolve(__dirname, 'build', '<%= dizmoName %>'),
        filename: 'index.js'
    },
    mode: 'none'
};
