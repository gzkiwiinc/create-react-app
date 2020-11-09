'use strict';
const path = require('path');

const baseWebpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const webpack = require('webpack');

// 是否忽略掉项目中集成的Sentry
const IGNORE_SENTRY = process.env.IGNORE_SENTRY === 'true'

const webpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '..', 'wwwroot/dist'),
		filename: 'static/js/app.bundle.[hash].js',
		chunkFilename: 'static/js/[id].[chunkhash].js',
		publicPath: process.env.PUBLIC_URL,
	},
	plugins: [
		...baseWebpackConfig.plugins,
		new MiniCssExtractPlugin({
			filename: 'static/css/[name].[hash].css',
			chunkFilename: 'static/css/[id].[chunkhash].css',
		}),
		new webpack.DefinePlugin({
			'process.env.IGNORE_SENTRY': process.env.IGNORE_SENTRY
		}),
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: true,
			cacheGroups: {
				vendors: {
					enforce: true,
					test: /node_modules/,
					name: 'vendor',
					filename: 'static/js/[name].[hash].js',
					priority: -10,
				},
			},
		},
	},
});

if (!IGNORE_SENTRY)
{
	webpackConfig.plugins.push(
		new SentryWebpackPlugin({
			release: `${process.env.NODE_ENV}-${require(path.join(__dirname, '..', 'package.json')).version}`,
			include: path.join(__dirname, '../', 'wwwroot/dist'),
			ignore: ['node_modules'],
			debug: false,
			configFile: path.join(__dirname, '..', 'sentry.properties'),
			urlPrefix: process.env.PUBLIC_URL,
		}))
}

module.exports = webpackConfig;
