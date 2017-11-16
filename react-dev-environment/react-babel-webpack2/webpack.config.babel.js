import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { HotModuleReplacementPlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const serverEnv = {
	port : 13030
}

const defaultEnv = {
	dev: true,
	production: false,
};

export default (env = defaultEnv) => ({
	entry: [
		...env.dev ? [
			'react-hot-loader/patch', // Needed to preserve state
			'webpack-dev-server/client?http://localhost:' + serverEnv.port, // webpack dev server host and port
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
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [
								['env', { modules: false }],
								'react',
							],
							plugins: ['react-hot-loader/babel']
						}
					}
				]
			},
			{
				test: /\.(css|scss|sass)$/,
				loader: env.dev ? 'style-loader!css-loader!sass-loader' : ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader!sass-loader'
				})
			},
		]
	},
	devServer: {
		port: serverEnv.port,
		hot: env.dev
	}
});