import Vue from "vue";
import App from "./App";
import router from "./router";
import demoBlock from "./components/demo-block.vue";
import hljs from "highlight.js";
import "highlight.js/styles/color-brewer.css";
import { Image } from "libdemo";
//import Permission from "~/permission/index";
import ElementUI from "element-ui";
Vue.use(ElementUI, { size: "small", zIndex: 3000 });

Vue.use(Image);

Vue.component("demo-block", demoBlock);
router.afterEach(() => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll("pre code:not(.hljs)");
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
