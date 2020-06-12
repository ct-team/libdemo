module.exports = {
  // presets: [
  //   "@vue/app"
  // ],
  presets: ["@babel/preset-env"],
  plugins: [
    //增加属性开始
    [
      "component",
      {
        libraryName: "libdemo",
        style: false,
      },
    ],
    //增加属性结束
  ],
};
