module.exports = (config, options) => {
  config.module.rules.push(
    {
      test: /\.js$/,
      exclude: /node_modules(?!\/whatwg\-fetch|\/webrtc\-adapter|\/fse|\/debuggo|\/debug|\/jsonref|\/\@vivocha)/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: false,
        presets: [
          ['@babel/env', {
            targets: {
              "browsers": [
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 safari versions"
              ]
            }
          }]
        ]
      }
    }
  );
  return config;
};