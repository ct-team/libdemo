const fs = require("fs");
const path = require("path");
const join = path.join;
// 获取基于当前路径的目标文件
const resolve = (dir) => path.join(__dirname, "../", dir);

/**
 * @desc 大写转横杠
 * @param {*} str
 */
function upperCasetoLine(str) {
  let temp = str.replace(/[A-Z]/g, function(match) {
    return "-" + match.toLowerCase();
  });
  if (temp.slice(0, 1) === "-") {
    temp = temp.slice(1);
  }
  return temp;
}

/**
 * @desc 获取组件入口
 * @param {String} path
 */
function getComponentEntries(path) {
  let files = fs.readdirSync(resolve(path));

  const componentEntries = files.reduce((fileObj, item) => {
    // 文件路径
    const itemPath = join(path, item);
    // 在文件夹中
    const isDir = fs.statSync(itemPath).isDirectory();
    const [name, suffix] = item.split(".");

    // 文件中的入口文件
    if (isDir) {
      fileObj[upperCasetoLine(item)] = resolve(join(itemPath, "index.js"));
    }
    // 文件夹外的入口文件
    else if (suffix === "js") {
      fileObj[name] = resolve(`${itemPath}`);
    }
    return fileObj;
  }, {});

  return componentEntries;
}

const buildConfig = {
  // 输出文件目录
  outputDir: resolve("lib"),
  productionSourceMap: false,

  // webpack配置
  configureWebpack: {
    externals: {
      vue: "vue",
      axios: "axios",
      "ct-dart/lib/utils": "ct-dart/lib/utils",
    },
    // 入口文件
    entry: getComponentEntries("packages"),
    // 输出配置
    output: {
      filename: "[name].js",
      chunkFilename: "[id].js",
      libraryTarget: "commonjs2",
    },
  },
  css: {
    sourceMap: false,
    extract: false, //不生成样式
    // extract: {
    //   filename: "style/[name].css", //在lib文件夹中建立style文件夹中，生成对应的css文件。
    // },
  },
  chainWebpack: (config) => {
    config.module
      .rule("js")
      .include.add(resolve("packages"))
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((options) => {
        // 修改它的选项...
        return options;
      });
    config.optimization.minimize(false);
    config.optimization.delete("splitChunks");
    config.plugins.delete("copy");
    config.plugins.delete("html");
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.plugins.delete("hmr");
    config.entryPoints.delete("app");
  },
};

module.exports = buildConfig;
