import Image from "./image/index.js";

const components = [Image];

const install = function (Vue) {
  components.forEach((component) => {
    Vue.use(component);
  });
};

/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

module.exports = {
  version: "1.0.0",

  Image,

  install,
};

module.exports.default = module.exports;
