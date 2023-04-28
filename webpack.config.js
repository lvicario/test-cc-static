// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }

    config.plugins.push(new WorkboxWebpackPlugin.InjectManifest({
        swSrc: path.resolve(__dirname, 'src/src-sw.js'),
        swDest: path.resolve(__dirname, 'public/sw.js'),
        additionalManifestEntries: [
            {
                url: "/img/logo.png",
                revision: "udi23fsa"
            },
            {
                url: "/img/plug-disconnected.png",
                revision: "udi23fsa"
            }
        ],
        include: [
            "/img/logo.png",
            "/img/plug-disconnected.png",
        ]

    }));
    return config;
};
