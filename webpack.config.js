const path = require('path');

module.exports = {
    entry: './src/js/scripts.js', // Path to your main JavaScript file
    output: {
        filename: 'scripts.js', // Output file name
        path: path.resolve(__dirname, 'dist/js'), // Output directory
    },
    mode: 'production', // Use 'development' for debugging
    module: {
        rules: [
            {
                test: /\.m?js$/, // Match JavaScript files
                exclude: /(node_modules)/, // Exclude node_modules
                use: {
                    loader: 'babel-loader', // Transpile modern JS for older browsers
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        fallback: {
            fs: false, // Prevent Webpack from trying to bundle Node.js modules
        },
    },
};