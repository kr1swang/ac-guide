var path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/scripts/react/app.js',
    output: {
        path: path.resolve(__dirname, './src/scripts/bundle/'),
        filename: 'app.js',
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env', 'babel-preset-react'],
                    plugins: ['transform-object-rest-spread']
                }
            }
        }]
    }
}