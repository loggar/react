import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { HotModuleReplacementPlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const defaultEnv = {
	dev: true,
	production: false,
};

export default (env = defaultEnv) => ({
	entry: [
		...env.dev ? [
			'react-hot-loader/patch', // Needed to preserve state
			'webpack-dev-server/client?http://localhost:8080', // webpack dev server host and port
		] : [],
		path.join(__dirname, 'src/index.jsx'),
	],
	output: {
		path: path.join(__dirname, env.dev ? 'dist' : 'dist-production'),
		filename: 'bundle.js',
	},
	plugins: [
		...env.dev ? [
			new HotModuleReplacementPlugin(),
		] : [
				new ExtractTextPlugin('[name].css'),
			],
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		}),
	],
	module: {
		rules: [
			{
				test: /.jsx?$/,
				exclude: /node_modules/,
				include: path.join(__dirname, 'src'),
				use: [
					{
						loader: 'babel',
						options: {
							babelrc: false,
							presets: [
								['es2015', { modules: false }],
								'react',
							],
							plugins: ['react-hot-loader/babel']
						}
					}
				]
			},
			{
				test: /\.(css|scss|sass)$/,
				loader: env.dev ? 'style!css!sass' : ExtractTextPlugin.extract({
					fallbackLoader: 'style',
					loader: 'css!sass'
				})
			},
		]
	},
	devServer: {
		hot: env.dev
	}
});