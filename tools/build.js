// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';

process.NODE_ENV = 'production';

console.log('Generating minified bundle files via Webpack, This will take a moment');

webpack(webpackConfig).run((error, stats) => {
  if (error) {
    console.log(error.bold.red);
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }
  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }
  console.log(`Webpack stats: ${stats}`);
  console.log('Your app has been compiled in production mode and written to /dist');
  return 0;
});
