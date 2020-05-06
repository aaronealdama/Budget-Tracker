const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require('path');

const config = {
    mode: 'production',
    entry: {
        index: "./index.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    plugins: [
        new WebpackPwaManifest({
            fingerprings: false,
            inject: false,
            name: "Budget Tracker",
            short_name: "Budget Tracker",
            description: "App to keep track of your budget",
            background_color: "#01579b",
            theme_color: "#ffffff",
            start_url: "/",
            icons: [{
                src: path.resolve("icons/images/icon-192x192.png"),
                sizes: [192, 512],
                destination: path.join("icons")
            }]
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}

module.exports = config;