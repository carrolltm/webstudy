---
typora-root-url: imags
---

# SCSS学习

[参考](https://www.jianshu.com/p/a99764ff3c41)

scss和sass区别

​	Scss 是 Sass 3 引入新的语法，是Sassy CSS的简写，是CSS3语法的超集，也就是说所有有效的CSS3样式也同样适合于Sass。说白了Scss就是Sass的升级版，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。

1.文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 Scss 是以“.scss”后缀为扩展名。

2.语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 Scss 的语法书写和我们的CSS 语法书写方式非常类似。

## 安装

npm安装

```js
npm install -g sass
```

如果报错的话，使用cnpm安装

这是换淘宝镜像

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

```
 cnpm install node-sass --save 
```

## 变量

格式:`$variabename:value`

```bash
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333; }
```

## 引入

​	SASS能够将代码分割为多个片段，并以underscore风格的下划线作为其命名前缀（_partial.scss），SASS会通过这些下划线来辨别哪些文件是SASS片段，并且不让片段内容直接生成为CSS文件，从而只是在使用@import指令的位置被导入

​	CSS原生的@import会通过额外的HTTP请求获取引入的样式片段，而SASS的@import则会直接将这些引入的片段合并至当前CSS文件，并且不会产生新的HTTP请求。下面例子中的代码，将会在base.scss文件当中引入_reset.scss片断。

```csharp
// 在base.scss文件当中引入_reset.scss片断
// _reset.scss
html, body, ul, ol {
  margin:  0;
  padding: 0;
}

// base.scss
@import 'reset';
body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef;
}
```

### Sass Partials：

​	如果你不希望将一个 Sass 的代码文件编译到一个 CSS 文件，你可以在文件名的开头添加一个下划线。这将告诉 Sass 不要将其编译到 CSS 文件。

​	但是，在导入语句中我们不需要添加下划线。

​	Sass Partials 语法格式：

```
_filename;
```

以下实例创建一个 _colors.scss 的文件，但是不会编译成 _colors.css 文件：

**_colors.scss 文件代码：**

```js
$myPink: #EE82EE;
$myBlue: #4169E1;
$myGreen: #8FBC8F;
```

如果要导入该文件，则不需要使用下划线：

**实例**

```js
@import "colors";

body {
 **font-family**: Helvetica, sans-serif;
 **font-size**: 18px;
 **color**: $myBlue;
}
```

​	SASS中引入片断时，可以**缺省**使用文件扩展名，因此上面代码中直接通过@import 'reset'引入

```css
html, body, ul, ol {
  margin: 0;
  padding: 0; }

body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef; }
```

## 混合

​	混合（Mixin）用来分组那些需要在页面中复用的CSS声明，开发人员可以通过向Mixin传递变量参数来让代码更加灵活，该特性在添加浏览器兼容性前缀的时候非常有用。SASS目前使用@mixin name指令来进行**混合操作**。

```ruby
@mixin border-radius($radius) {
          border-radius: $radius;
      -ms-border-radius: $radius;
     -moz-border-radius: $radius;
  -webkit-border-radius: $radius;
}

.box {
  @include border-radius(10px);
}
```

​	上面的代码建立了一个名为border-radius的Mixin，并**传递**了一个变量$radius作为**参数，**然后在后续代码中通过@include border-radius(10px)使用该Mixin，最终编译的结果如下：

```css
.box {
  border-radius: 10px;
  -ms-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px; }
```

上面的`mixin`怎么感觉类似函数一样。

## 继承

​	`@extend`指令在选择器之间复用CSS属性，并且不会产生冗余的代码，下面例子将会通过SASS提供的继承机制建立一系列样式：

疑问：下面这百分号的作用。

```dart
// 这段代码不会被输出到最终生成的CSS文件，因为它没有被任何代码所继承。
%other-styles {
  display: flex;
  flex-wrap: wrap;
}

// 下面代码会正常输出到生成的CSS文件，因为它被其接下来的代码所继承。
%message-common {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend %message-common;
}

.success {
  @extend %message-common;
  border-color: green;
}

.error {
  @extend %message-common;
  border-color: red;
}

.warning {
  @extend %message-common;
  border-color: yellow;
}
```

```css
.message, .success, .error, .warning {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333; }

.success {
  border-color: green; }

.error {
  border-color: red; }

.warning {
  border-color: yellow; }
```

## 操作符

​	SASS提供了标准的算术运算符，例如+、-、*、/、%。在接下来的例子里，我们尝试在aside和article选择器当中对宽度进行简单的计算。

```css
.container { width: 100%; }

article[role="main"] {
  float: left;
  width: 600px / 960px * 100%;
}

aside[role="complementary"] {
  float: right;
  width: 300px / 960px * 100%;
}
```

```css
.container {
  width: 100%; }

article[role="main"] {
  float: left;
  width: 62.5%; }

aside[role="complementary"] {
  float: right;
  width: 31.25%; }
```

## css扩展

#### 引用父级选择器

​	Scss使用"&"关键字在CSS规则中引用父级选择器。

```swift
/*===== SCSS =====*/
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
  body.firefox & { font-weight: normal; }
}

/*===== CSS =====*/
a {
  font-weight: bold;
  text-decoration: none; }
  a:hover {
    text-decoration: underline; }
  body.firefox a {
    font-weight: normal; }
```

​	无论CSS规则嵌套的深度怎样，关键字"&"都会使用父级选择器级联替换全部其出现的位置。

```css
/*===== SCSS =====*/
#main {
  color: black;
  a {
    font-weight: bold;
    &:hover { color: red; }
  }
}
/*===== CSS =====*/
#main {
  color: black;
}
#main a {
  font-weight: bold;
}
#main a:hover {
  color: red;
}

```

​	"&"必须出现在复合选择器开头的位置，后面再连接自定义的后缀

```cpp
/*===== SCSS =====*/
#main {
  color: black;
  &-sidebar { border: 1px solid; }
}

/*===== CSS =====*/
#main {
  color: black;
}
#main-sidebar {
    border: 1px solid; }
```

​	如果在父级选择器不存在的场景使用&，Scss预处理器会报出错误信息。

## 嵌套属性

​	CSS许多属性都位于相同的命名空间（例如font-family、font-size、font-weight都位于font命名空间下），Scss当中只需要编写命名空间一次，后续嵌套的子属性都将会位于该命名空间之下，请看下面的代码：

```cpp
/*===== SCSS =====*/
.demo {
  // 命令空间后带有冒号:
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}

/*===== CSS =====*/
.demo {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold; }
```

​	命令空间上可以直接书写CSS简写属性，但是日常开发中建议直接书写CSS简写属性，尽量保持CSS语法的一致性。

```css
.demo {
  font: 20px/24px fantasy {
    weight: bold;
  }
}

.demo {
  font: 20px/24px fantasy;
    font-weight: bold;
}
```