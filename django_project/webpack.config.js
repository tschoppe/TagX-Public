//require our dependencies
var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var CommonsChunkPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin")

module.exports = {
    //the base directory (absolute path) for resolving the entry option
    context: __dirname,
    // the entry point we created earlier. Note that './' means
    // your current directory. You don't have to specify the extension now,
    // because you will specify extensions later in the `resolve` section

    entry: {
		login: './TagX/static/js/login',
		mysystems: './TagX/static/js/mysystems'
	},
	output: {
		path: path.resolve('./TagX/static/bundles/'),
		filename: '[name].js',
		chunkFilename: "[id].chunk.js"
	},
	plugins: [
	    new BundleTracker({filename: './webpack-stats.json'}),
        //makes jQuery available in every module
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
		new CommonsChunkPlugin({
			filename: "commons.js",
			name: "commons"
		})
	],
    
    module: {
        loaders: [
            //a regexp that tells webpack use the following loaders on all 
            //.js and .jsx files
            {test: /\.jsx?$/, 
                //we definitely don't want babel to transpile all the files in 
                //node_modules. That would take a long time.
                exclude: /node_modules/, 
                //use the babel loader 
                loader: 'babel-loader', 
                query: {
                    //specify that we will be dealing with React code
                    presets: ['react'] 
                }
            }
        ]
    },
    
    resolve: {
        //tells webpack where to look for modules
        modulesDirectories: ['node_modules'],
        //extensions that should be used to resolve modules
        extensions: ['', '.js', '.jsx'] 
    }   
}
