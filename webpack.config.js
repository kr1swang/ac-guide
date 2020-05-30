const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    context: __dirname,
    entry: './src/scripts/react/App.jsx',
    output: {
        path: path.resolve(__dirname, './src/scripts/bundle/'),
        filename: 'App.js',
        chunkFilename: 'chunk.[contenthash].js',
        publicPath: './src/scripts/bundle/'
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}