const { resolve } = require('path');
module.exports = {
    entry: {
        main: ['@babel/polyfill', './src/index.ts']
    },
    module: {
        rules: [{
            test: /\.tsx?$/i,
            exclude: [/node_modules/i],
            use: 'ts-loader'
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
        }, {
            test: /\.(s[ac]ss|css)$/i,
            use: [{
                loader: 'style-loader',
                options: { insert }
            }, {
                loader: 'css-loader',
                options: { sourceMap: false }
            }, {
                loader: 'sass-loader',
                options: { sourceMap: false }
            }]
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: resolve(__dirname, 'build', '<%= dizmoName %>'),
        environment: { arrowFunction: false },
        filename: 'index.js'
    },
    mode: 'none'
};
function insert(style) {
    const head = document.querySelector('head');
    const links = head.querySelectorAll('link');
    if (links.length > 0) {
        head.insertBefore(style, links[links.length - 1]);
    } else {
        head.append(style);
    }
}
