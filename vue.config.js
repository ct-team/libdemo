const devConfig = require('./build/config.examples');
const buildConfig = require('./build/config.lib');

const runList = {
    'lib':buildConfig,
    'examples':devConfig,
    'dev':devConfig
}
console.log(process.env.BABEL_ENV);
module.exports = runList[process.env.BABEL_ENV];
