const path = require('path');

module.exports = {
    entry: 'index.js',
    module: {
	rules: [
            {
		test: /\.css$/,
		use: [
		    'style-loader',
		    'css-loader'
		]
            },
	    {
		test: /\.(csv|json|plot)$/,
		use: [
		    loader: 'file-loader',
		    options: {}
		]
	    }
        ]
    }
};
