const MarkdownItContainer = require("markdown-it-container");
const md = require("markdown-it")();
const path = require("path");
const utils = {
  /**
   * 增加 hljs 的 classname
   */
  wrapCustomClass: function(render) {
    return function() {
      return render
        .apply(this, arguments)
        .replace("<code v-pre", '<code class="hljs"')
        .replace("<code>", '<code class="hljs">');
    };
  },
  convertHtml: function(str) {
    str = str.replace(/(&#x)(\w{4});/gi, function($0) {
      return String.fromCharCode(
        parseInt(
          encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, "$2"),
          16
        )
      );
    });
    return str;
  },
};
const cheerio = require("cheerio");
//cheerio是nodejs的抓取页面模块，为服务器特别定制的，快速、灵活、实施的jQuery核心实现。适合各种Web爬虫程序。

const striptags = (str, tags) => {
  const $ = cheerio.load(str, { decodeEntities: false });

  if (!tags || tags.length === 0) {
    return str;
  }

  tags = !Array.isArray(tags) ? [tags] : tags;
  let len = tags.length;

  while (len--) {
    $(tags[len]).remove();
  }
  return $.html();
};

const vueMarkdown = {
  raw: true,
  // preset: "default",
  // breaks: true,
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function() {
      return '<table class="w-table">';
    };
    // const defaultRender = md.renderer.rules.fence;
    // MarkdownIt.renderer.rules.fence = (tokens, idx, options, env, self) => {
    //   const token = tokens[idx];
    //   // 判断该 fence 是否在 :::demo 内
    //   const prevToken = tokens[idx - 1];
    //   const isInDemoContainer =
    //     prevToken &&
    //     prevToken.nesting === 1 &&
    //     prevToken.info.trim().match(/^demo\s*(.*)$/);
    //   if (token.info === "html" && isInDemoContainer) {
    //     return `<template slot="highlight"><pre v-pre><code class="html tt">${md.utils.escapeHtml(
    //       token.content
    //     )}</code></pre></template>`;
    //   }
    //   return defaultRender(tokens, idx, options, env, self);
    // };
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(
      MarkdownIt.renderer.rules.fence
    );
    // ```code`` 给这种样式加个class code_inline
    // const code_inline = MarkdownIt.renderer.rules.code_inline;
    // MarkdownIt.renderer.rules.code_inline = function(...args) {
    //   args[0][args[1]].attrJoin("class", "code_inline");
    //   return code_inline(...args);
    // };
    return source;
  },
  use: [
    [
      MarkdownItContainer,
      "demo",
      {
        validate: function(params) {
          return params.trim().match(/^demo\s*(.*)$/);
        },

        render: function(tokens, idx) {
          var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

          if (tokens[idx].nesting === 1) {
            //var desc = tokens[idx + 2].content;
            const html = utils.convertHtml(
              striptags(tokens[idx + 1].content, "script")
            );
            // 移除描述，防止被添加到代码块
            tokens[idx + 2].children = [];

            var description = m && m.length > 1 ? m[1] : "";
            description = description ? md.render(description) : "";
            return `<demo-block>
            <div class="source" slot="html">${html}</div>
            ${description}
            <div class="highlight" slot="highlight">`;
          }
          return "</div></demo-block>\n";
        },
      },
    ],
    [MarkdownItContainer, "tip"],
    [MarkdownItContainer, "warning"],
  ],
};

module.exports = {
  outputDir: "dist",
  parallel: false, //不加无法打包examples
  publicPath: "./",
  productionSourceMap: false,
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html",
    },
  },
  // pluginOptions: {
  //   webpackBundleAnalyzer: {
  //     analyzerMode: 'static',
  //     openAnalyzer: false
  //   }
  // },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.resolve("examples"))
      .set("~", path.resolve("packages"));

    // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
    config.module
      .rule("js")
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((options) => {
        // 修改它的选项...
        return options;
      });
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options(vueMarkdown);
  },
};
