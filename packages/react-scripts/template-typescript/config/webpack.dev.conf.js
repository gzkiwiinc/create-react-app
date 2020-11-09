'use strict';
const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	...baseConfig,
	devServer: {
		contentBase: path.join(__dirname, '..', 'wwwroot/dist/'),
		compress: true,
		historyApiFallback: true,
		hot: true,
		port: 3002,
	},
	plugins: [
		...baseConfig.plugins,
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
	],
};
