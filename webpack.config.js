const path = require('path')

module.exports = {
    entry: './index.js',
    module: {
        rules: [{
            test: /\.(png)$/,
            use: [{
                loader: 'file-loader',
                options: {}
            }, {
                test: /\.(mp3|ogg|wav)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }]
        }]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    }
}