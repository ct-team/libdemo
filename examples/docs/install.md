## 依赖

element ui 2.7.2库

## 安装

先切换到内部[npm](http://192.168.101.116:4873/#/)

```
npm i dart -S
```

## 按需加载 （无法使用全局引入的方式）

借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```
npm install babel-plugin-component -D
```

然后，将 .babelrc plugins 增加属性 修改为：

```
{
  "plugins": [
  		//增加属性开始
        [
            "component",
            {
                "libraryName": "dart",
                "style": false
            }
        ]
		 //增加属性结束
    ],
}
```

## 使用方法

全局引入

```
import Vue from 'vue';

//全部引入
import dart from 'dart';
Vue.use(dart)

//引入部分
import {THeader} from 'dart';
Vue.use(THeader)
```


组件使用

```
//全局
<template>
	<t-header>111</t-header>
</template>

//局部
<template>
	<t-header>111</t-header>
</template>

import {THeader} from 'dart';

export default {
  components: {
    THeader
  }
}
```

函数类初始值

```

//全局

import Dart from 'dart';
Vue.use(Dart)；
Vue.$dart.cookie.setDefaults(opts);
//或
import {cookie} from 'dart';
Vue.use(cookie,{opts});

//局部

import {cookie} from 'dart';
cookie.setDefaults(opts);
```


函数类使用

```


//全局


export default {
  methods: {
    test(){
		this.$dart.cookie.get()
	}
  }
}



//局部
import {cookie} from 'dart';

export default {
  methods: {
    test(){
		cookie.defineds = {};
		cookie.get()
	}
  }
}
```