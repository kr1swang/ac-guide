var path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/scripts/react/App.jsx',
    output: {
        path: path.resolve(__dirname, './src/scripts/bundle/'),
        filename: 'App.js',
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'babel-preset-react'],
                        plugins: ['transform-object-rest-spread']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            }
        ]
    }
}