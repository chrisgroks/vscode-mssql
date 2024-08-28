const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: {
		connectionDialog: './src/reactviews/pages/ConnectionDialog/index.tsx',
		tableDeisgner: './src/reactviews/pages/TableDesigner/index.tsx',
		executionPlan: './src/reactviews/pages/ExecutionPlan/index.tsx',
	},
	output: {
		path: path.resolve(__dirname, 'out', 'src', 'reactviews', 'webpack'),
		filename: '[name].js', // Output file name with content hash for caching
		clean: true, // Clean the output directory before each build
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'connectionDialog.html',
			base: 'vscodeweburistring',
			scriptLoading: 'blocking',
			chunks: ['connectionDialog'],
		}),
		new HtmlWebpackPlugin({
			filename: 'tableDesigner.html',
			base: 'vscodeweburistring',
			chunks: ['tableDeisgner'],
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/, // Include both .js, .jsx, .ts, and .tsx files
				exclude: /node_modules/, // Exclude node_modules directory
				use: {
					loader: 'babel-loader', // Use Babel loader to transpile JavaScript and TypeScript
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'], // Use presets for ES6+, React, and TypeScript
					},
				},
			},
			{
				test: /\.css$/, // Include CSS files
				use: ['style-loader', 'css-loader'], // Use both style-loader and css-loader
			},
			{
				test: /\.(png|svg|gif)$/, // Include image files
				type: 'asset/resource', // Use asset module to handle image files
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve both .js, .jsx, .ts, and .tsx extensions
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					// cacheGroupKey here is `commons` as the key of the cacheGroup
					name(module, chunks, cacheGroupKey) {
						const moduleFileName = module
							.identifier()
							.split('/')
							.reduceRight((item) => item);
						const allChunksNames = chunks.map((item) => item.name).join('~');
						return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
					},
					chunks: 'all',
				},
			},
		}
	},
	mode: 'development', // Set mode to 'development' for unminified output
};