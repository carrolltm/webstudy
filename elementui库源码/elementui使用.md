---
typora-root-url: images
---

# elementui使用

[下载到本地使用](https://blog.csdn.net/guo8ke/article/details/90669554)

[源码学习方法](https://www.zhihu.com/question/60706223)

[组件分析教程](https://www.jianshu.com/u/b56b02622381)

[修改打包](https://www.jianshu.com/p/e745787118d0)

## 简单模仿按钮

### 步骤

1：创建vue项目

```js
vue create myi
```

2：运行一下看效果

```
npm run serve
```

3:去掉无用东西

app.vue里面的和删除hello word.vue里面的

4：创建组件

[模仿button](https://blog.csdn.net/weixiaowei_2016/article/details/104690644)

![image-20210126155457413](/../图片/image-20210126155457413.png)

那个链接上面不要这样做

这个js文件不要动，直接在app.vue里面导入

5：导入样式需要你install sass，具体可参考

https://www.cnblogs.com/xuxiaoyu/p/13283151.html

使用cnpm下载，npm下载出现问题，而且我在vscode终端安装不能安装

```js
 cnpm install node-sass --save 
```

简单实现结束

## 源码学习

### 目录结构

![image-20210126161655577](/../图片/image-20210126161655577.png)

- `build`：放置webpack的配置文件。
- `examples`：放置element api的页面文档。
- `packages`：放置element的组件（css样式放置在这个目录下`theme-chalk`下）。
- `src/directives`：放置自定义指令。
- `src/locale`：放置语言的配置文件。
- `src/mixins`：放置组件用的混合文件。
- `src/transitions`：放置动画配置文件。
- `src/utils`：放置用到工具函数文件。
- `src/index.js`：组件注册的入口文件。
- `test`：测试文件。
- `types`：这个文件里放了typescript的数据类，还没找到哪里用了这里的类，欢迎大神留言指点

### 组件

#### button

可以直接在你自己创建的目录下

components下创建button目录挂载

![image-20210126161541016](/../图片/image-20210126161541016.png)

官网参数

![image-20210126161843196](/../图片/image-20210126161843196.png)

```js
// 使用这个与父组件传参   
	props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean
    },
```

这边css样式在（css样式放置在这个目录下`packages/theme-chalk`下）。

##### 解析

button属性

```js
// 前面冒号是v-bind实现数据单向绑定
class=“el-button”
@click = “点击处理函数”
:disable = “判断值”   
:autofocus="自动聚焦"
:type="原生类型"
:class = “动态类型”
```

对于动态绑定类的实现，可以[参考](https://cn.vuejs.org/v2/guide/class-and-style.html)

对于button中scss的分析

[[Element源码分析](https://athena0304.cn/element-analysis/)](https://athena0304.cn/element-analysis/packages/theme-chalk/src/mixins/mixins.html)

![image-20210202095915371](/../图片/image-20210202095915371.png)

#### button-group

1：对于el-button-group：

![image-20210126183645625](/../图片/image-20210126183645625.png)

```js
<el-button-group>
  <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
  <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
</el-button-group>
<el-button-group>
  <el-button type="primary" icon="el-icon-edit"></el-button>
  <el-button type="primary" icon="el-icon-share"></el-button>
  <el-button type="primary" icon="el-icon-delete"></el-button>
</el-button-group>
```

也就是比elbutton对一个div封装。加了一层`div.el-button-group`包裹，内置一个`slot`用来放置按钮，因为按钮组主要是要改变样式，会将内部的按钮向左浮动。

2：button按钮

​	`el-button`组件是一个原生`button`，里面有三部分，分别是`loading 加载`、`icon 图标`以及`$slots.default 按钮文本`这三部分组成。

其中对于inject是让祖先组件注入该值：以允许一个祖先组件向其所有子孙后代注入一个依赖。

[参考](https://cn.vuejs.org/v2/api/#provide-inject)

#### Alert

```js
import Alert from './src/main';

/* istanbul ignore next */
Alert.install = function(Vue) {
  Vue.component(Alert.name, Alert);
};

export default Alert;

```

最外层的动画：transition

```js
// alert.vue
<transition name="el-alert-fade">
//scss 中
.el-alert-fade-enter,
.el-alert-fade-leave-active {
  opacity: 0;
}

```

对于里面的slot值。

```js
  <!-- 如果没传入文本插槽，则不显示span内容 -->
   <span v-if="$slots.default"><slot></slot></span>
  </button>
```

## button自己实现

![image-20210128082147122](/../图片/image-20210128082147122.png)

使用props保存

对于：是版本的问题

Syntax Error: Error: PostCSS received undefined instead of CSS string

```
npm uninstall sass-loader
npm uninstall node-sass
npm install node-sass@4.14.1 --dev
npm install sass-loader@8.0.0 --dev
```

