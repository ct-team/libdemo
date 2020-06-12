## Image 图片查看

用于图片展示与放大查看

<script>
    export default {
        data() {
            return {
                value1: 'http://img.yaodou.com/game/syz/2019071308500.jpg',
                value2: 'http://img.baidu.com/hi/jx2/j_0002.gif',
                value3:'http://fdsimg.tcy365.net/news/ct0-cc68900e-68d5-42ae-9fee-7bdd73c7c289.jpg'
            }
        }
    };
</script>

## 基础

:::demo

```html
<div>
    <dart-image :value="value1" type="small"></dart-image>
    <p>small 50x50</p>
</div>
<div>
    <dart-image :value="value1" type="middle"></dart-image>
    <p>middle 100x100</p>
</div>
<div>
    <dart-image :value="value1" type="big"></dart-image>
    <p>big 200x200</p>
</div>


```

```js
<script>
    export default {
        data() {
            return {
                value1: 'http://img.yaodou.com/game/syz/2019071308500.jpg'
            }
        }
    };
</script>



```

:::

## 自定义

:::demo

```html
<div>
    <dart-image :value="value1" type="auto" width="100px"></dart-image>
    <p>auto w=100px</p>
</div>
<div>
    <dart-image :value="value2" type="auto" width="30px"></dart-image>
    <p>auto w=30px</p>
</div>
<div>
    <dart-image :value="value3" type="auto" width="300px"></dart-image>
    <p>auto w=300px</p>
</div>
```

```js
<script>
    export default {
        data() {
            return {
                value1: 'http://img.yaodou.com/game/syz/2019071308500.jpg',
                value2: 'http://img.baidu.com/hi/jx2/j_0002.gif',
                value3:'http://fdsimg.tcy365.net/news/ct0-cc68900e-68d5-42ae-9fee-7bdd73c7c289.jpg'
            }
        }
    };
</script>

```

:::

## 属性

| 名称            | 说明            | 类型   | 默认值 | 可选值 | 版本 |
| --------------- | --------------- | ------ | ------ | ------ | ---- |
| value | 绑定值          | string | ''     | -      | -    |
| type          | 图片展示类型  | string | small  | small middle big auto      | |
| height          | auto 时显示的高 | string | '' | -      |
| width          | auto 时显示的宽度| string | '' | -      |
| view          | 可点击显示大图 | Boolean | true | -      |
| alt          | 原生alt | string | '' | -      |
| title          | 原生title | string | '' | -      |
| viewTitle          | 查看器title | string | '' | -      |
| viewWidth          | 查看器最大的尺寸 | string | '50%' | -      |
| viewImgSrc          | 查看器显示的图片 默认读取 value | string | '' | -      |

## 维护人

戴旭亮

## 发布日志

| 大版本 | 子版本 | 说明     |
| ------ | ------ | -------- |
| 1.6.0  | 1.0.0  | 初始版本 |
