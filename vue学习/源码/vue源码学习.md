---
typora-root-url: images
---

# vue源码学习

[参考1](https://github.com/muwoo/blogs)

[参考2](http://caibaojian.com/vue-design/)

[参考3](http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/)

------

## 框架初解

### Vue的构造函数

真正的起点

src\core\instance\index.js

```js
// // Vue 的原型上添加了 _init 方法
import { initMixin } from './init'
// 在 Vue.prototype 上添加了$data ,$props,$set,$delete,$watch属性方法
import { stateMixin } from './state'
// 在 Vue.prototype 上添加了$nextTick ,_render ,installRenderHelpers(这个函数中有很多方法)方法
import { renderMixin } from './render'
// 在 Vue.prototype 上添加了$on，$once,$off,$emit四个方法
import { eventsMixin } from './events'
// 在 Vue.prototype 上添加了 _update,$forceUpdate,$destroy
import { lifecycleMixin } from './lifecycle'
```

上面每个 `*Mixin` 方法的作用其实就是包装 `Vue.prototype`，在其上挂载一些属性和方法，

[Vue构造函数原型归纳](http://caibaojian.com/vue-design/appendix/vue-prototype.html)

```
// 运行版
entry-runtime.js
// 完整版 
entry-runtime-with-compiler.js
// 上面二选一，下面递进
runtime/index.js--->core/index.js-->core/instance/index.js
```

**构造函数：**

`core/instance/index.js` 文件：是 `Vue` 构造函数的定义文件，我们一直都叫其 `Vue` 的出生文件，主要作用是定义 `Vue` 构造函数，并对其原型添加属性和方法，即实例属性和实例方法

 `core/index.js` 文件：主要作用是，为 `Vue` 添加全局的API，也就是静态的方法和属性。

### vue平台化包装

​		`Vue` 是一个 `Multi-platform` 的项目（web和weex），不同平台可能会内置不同的组件、指令，或者一些平台特有的功能等等，那么这就需要对 `Vue` 根据不同的平台进行平台化地包装，这就是接下来我们要看的文件，这个文件也出现在我们寻找 `Vue` 构造函数的路线上，它就是：`platforms/web/runtime/index.js` 文件。

### 以一个例子为线索

```html
<div id="app">{{test}}</div>
```

```js
var vm = new Vue({
    el: '#app',
    data: {
        test: 1
    }
})
```

```html
// 效果
<div id="app">1</div>
```