import Vue from "vue";
import Router from "vue-router";
import navData from '../nav.data.json';

Vue.use(Router);
// const Foo = r => require.ensure([], () => r(require('../doc/test.md')), 'group-foo')
var router = [];

Object.keys(navData).forEach(item => {
    if (navData[item].group) {
        router = router.concat(navData[item].group);
    } else {
        router = router.concat(navData[0]);
    }
});
const addComponent = routes => {
    routes.forEach(route => {
        if (route.type === 'pages') {
            route.component = () => import(`../pages/${route.name}.vue`);
            return;
        }
        if (!route.path) {
            route.path = '';
        }
        if (route.items) {
            addComponent(route.items);
            router = router.concat(route.items);
        } else {
            if (route.type === 'pages') {
                route.component = () => import(`../pages/${route.name}.vue`);
                return;
            }
            route.component = () => import(`../docs/${route.name}.md`);
        }
    });
};

addComponent(router);
const routerVue = new Router({
    routes: router
});
// const routerVue = new Router({
//   routes: [
//     {
//       path: "/",
//       component: () => import("../doc/test3.md"),
//     },
//     {
//       path: "/test",
//       component: () => import("../doc/test.md"),
//     },
//   ],
// });
routerVue.afterEach(() => {
    if (document.getElementsByClassName('w-scroll')[0]) {
        document.getElementsByClassName('w-scroll')[0].scrollTo(0, 0);
    }
});
export default routerVue;
