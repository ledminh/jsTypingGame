const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // support import "./style.css";

module.exports = ({mode}) => {
    
    return {
        output: {
            filename: 'bundle.js'
        },

        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: mode == 'production'? [MiniCssExtractPlugin.loader, "css-loader"] :["style-loader", "css-loader"]
                },
                {
                    test: /\.jpe?g$|\.png$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 5000
                            }
                        }
                    ]
                },                
                
            ]
        },

        plugins: [
            new HtmlWebpackPlugin(),
            ...(mode == 'production'? [new MiniCssExtractPlugin()]: []) 
        ]
    };
}
    
