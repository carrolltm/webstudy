---
typora-root-url: imgaes
---

# Jquery学习

​	一个优秀的js函数库。封装了Dom和Bom。

学习：jquery基础教程第四版

源码解析：[答案](https://blog.jonslow.com/learning-jquery-4th-edition-exercises/)

源码下载（已经有答案）：[源码](https://github.com/cwy007/jquery-4th-source-code)

## jQuery入门

### 能做什么

- 取得文档中的元素
- 修改页面的外观：提供跨浏览器的标准解决方案
- 改变文档的内容
- 响应用户的交互操作
- 为页面添加动态效果
- 无需刷新页面从服务器获取信息
- 简化常见的js任务

### jQuery出色

- 利用css选择器

- 支持扩展

- 抽象浏览器不一致性

- 总是面向集合

- 将多重操作集于一行

  通过使用$(document).ready()方法， jQuery支持我们预定在DOM加载完毕后调用某个函
  数，而不必等待页面中的图像加载。尽管不使用jQuery，也可以做到这种预定，但$(document).
  ready()为我们提供了很好的跨浏览器解决方案  。ready里面接受的是一个函数

------

## 选择元素

​	取得元素的工具：jquery选择器和遍历方法。

[对应API](https://jquery.cuishifeng.cn/nthChild.html)

### 使用$()函数

​	为了创建jQuery对象，就要使用$()函数。这个函数接受CSS选择符作为参数，充当一个工
厂，返回包含页面中对应元素的jQuery对象。所有能在样式表中使用的选择符都可以传给这个函
数，随后我们就可以对匹配的元素集合应用jQuery方法。  

> **让jQuery与其他JavaScript库协同工作**
>
> ​	在jQuery中， 美元符号$只不过标识符jQuery的“别名”。 由于$()在JavaScript库中很常见，所以，如果在一个页面中使用了几个这样的库，那么就会导致冲突。在这种情况下，可以在我们自定义的jQuery代码中，通过将每个$的实例替换成jQuery来避免这种冲突。第10章还会介绍这个问题的其他解决方案。  

**三种基本选择符：标签名、 ID和类**。这些选择符可以单独使用，也可以与其他选择符组
合使用  ：

​	![image-20210220103036513](/../图片/image-20210220103036513.png)

​	在将方法连缀到$()工厂函数后面时，包装在jQuery对象中的元素会被自**动、隐式**地循环遍历。换句话说，这样就避免了使用for循环之类的显式迭代（这种迭代在DOM脚本编程中非常常见）。  

​	所有jQuery和window.onload相比都是循环遍历查找元素，但是window.onload需要你自己手写遍历，但是jQuery不需要你手写遍历。

### css选择符

> **渐进增强**
> 负责任的jQuery开发者应该在编写自己的程序时，始终坚持渐进增强
> （ progressive enhancement）和平稳退化（ graceful degradation）的理念，做到在
> JavaScript禁用时，页面仍然能够与启用JavaScript时一样准确地呈现，即使没有
> 那么美观。贯穿本书，我们还将继续探讨这些理念。关于渐进增强的更多信息，
> 请参考： http://en.wikipedia.org/wiki/Progressive_enhancement  

#### 基于列表项的级别添加样式

```js
	$('#selected-plays > li').addClass('horizontal');  
```

### 属性选择器

​	属性选择符通过HTML元素的属性来选择元素，例如链接的title属性或图像的alt属性。

```js
$('img[alt]')
```

#### 为链接添加样式

​	属性选择符使用一种从正则表达式中借鉴来的通配符语法，以^表示值在字符串的开始，以$表示值在字符串的结尾。而且，也是用星号*表示要匹配的值可以出现在字符串中的任意位置，用叹号!表示对值取反。  

```js
为所有电子邮件链接添加类，需要构造一个选择符，用来寻找所有带href属性（ [href]）
且以mailto开头（ ^="mailto:"]）的锚元素（ a）。

$(document).ready(function() {
$('a[href^="mailto:"]').addClass('mailto');
});
```

### 自定义选择符

> 性能提示
> 只要可能， jQuery就会使用浏览器原生的DOM选择符引擎去查找元素。但在
> 使用自定义选择符的时候，就无法使用速度最快的原生方法了。因此，建议读者
> 在能够使用原生方法的情况下，就不要频繁地使用自定义选择符，以确保性能。  

自定义选择符通常跟在一个CSS选择符后面，基于已经选择的元素集的位置来查找元素。自定义选择符
的语法与CSS中的伪类选择符语法相同，即选择符以冒号（ :）开头。  

```js
我们想要从带有horizontal类的<div>集合中选择第2项，那么应该使用下面的代码：
$('div.horizontal:eq(1)')
注意:
因为JavaScript数组采用从0开始的编号方式， 所以eq(1)取得的是集合中的第2个元素
而CSS则是从1开始的，因此CSS选择符$('div:nth-child(1)')取得的是作为其父元素第1个
子元素的所有div元素。
```

#### 每隔一行为表格添加样式  

​	jQuery库中的两个十分有用的自定义选择符是:odd和:even。  

对于

```
$('tr:even')  匹配所有索引值为偶数的元素，从 0 开始计数
$('tr:odd')   匹配所有索引值为奇数的元素，从 0 开始计数
$('tr:eq(1)') 匹配一个给定索引值的元素,从 0 开始计数
$("ul li:nth-child(2)")  匹配其父元素下的第N个子或奇偶元素,是jQuery中唯一从1开始计数的选择符
$("ul li:nth-child(even)")
```

#### 基于上下文内容选择元素  

```js
:contains(text)
概述
匹配包含给定文本的元素
text:
一个用以查找的字符串
```

选择得到的都是对应标签。

> 必须注意， :contains()选择符区分大小写。换句话说，使用不带大写“H”
> 的$('td:contains(henry)')，不会选择任何单元格。  

#### 基于表单的选择符  

![image-20210220135600656](/../图片/image-20210220135600656.png)

```js
$(":input")
$("input:enabled")
```

### DOM 遍历方法  

```js
$('tr:even').addClass('alt');
可以重写为：
$('tr').filter(':even').addClass('alt');
```

​	.filter()的功能也十分强大，因为它可以接受函数参数。通过传入的函数，可以执行复杂的测试，以决定相应元素是否应该保留在匹配的集合中。  

​	我们要为所有外部链接添加一个类  :

```
a.external {
background: #fff url(images/external.png) no-repeat 100% 2px;
padding-right: 16px;
}
```

```js
对外链添加类
$('a').filter(function() {
	return this.hostname && this.hostname != location.hostname;
}).addClass('external');
第二行代码可以筛选出符合下面两个条件的<a>元素。
 必须包含一个带有域名（ this.hostname）的href属性。这个测试可以排除mailto及类似链接。
 链接指向的域名（还是this.hostname）必须不等于（ !=）页面当前所在域的名称（ location.hostname）。
更准确地说， .filter()方法会迭代所有匹配的元素，对每个元素都调用传入的函数并 选择元素函数的返回值。如果函数返回false，则从匹配集合中删除相应元素；如果返回true，则保留相应元素。

```

#### 为特定单元格添加样式  

​	给每个包含Henry的单元格的下一个单元格添加样式，可以将已经编写好的选择符作为起点，然后连缀一个.next()方法即可 。

```js
$(document).ready(function() {
		$('td:contains(Henry)').next().addClass('highlight');
});
```

​	.next()方法只选择下一个最接近的同辈元素。要想突出显示Henry所在单元格后面的全部单元格，可以使用.nextAll()方法，  

```js
$(document).ready(function() {
	$('td:contains(Henry)').nextAll().addClass('highlight')
});
```

#### 连缀

在jQuery中，可以通过一行代码取得多个元素集合并对这些元素集合执行多次操作。 jQuery的这种连缀能力不仅有助于保持代码简洁，而且在替代组合重新指定选择符时，还有助于提升脚本性能 。

> 方法连缀的原理
> 几乎所有jQuery方法都会返回一个jQuery对象，因而可连缀调用多个jQuery
> 方法。第8章还会详细讨论连缀的原理。  

```js
$('td:contains(Henry)').parent().find('td:eq(1)')
.addClass('highlight').end().find('td:eq(2)')
.addClass('highlight');
也可以写成
$('td:contains(Henry)') //取得包含Henry的所有单元格
.parent() //取得它的父元素
.find('td:eq(1)') //在父元素中查找第2个单元格
.addClass('highlight') //为该单元格添加hightlight类
.end() //恢复到包含Henry的单元格的父元素
.find('td:eq(2)') //在父元素中查找第3个单元格
.addClass('highlight'); //为该单元格添加hightlight类
```

### 访问Dom元素

​	可能需要为另一个JavaScript库提供一组元素的结果集合。或者可能不得不访问某个元素的标签名——通过DOM元素的属性。对于这些少见但合理的情形， jQuery提供了.get()方法。

```js
var myTag = $('#my-element').get(0).tagName;
还可以写成
var myTag = $('#my-element')[0].tagName;
```

### 小结

​	通过本章介绍的技术，读者应该掌握了如何使用CSS选择符以不同方式在页面中选择元素集合，以及为嵌套列表中的顶级和非顶级项分别添加样式，如何使用属性选择符为不同类型的链接应 用 不 同 的 样 式 ， 如 何 使 用 自 定 义 的 jQuery 选 择 符 :odd 和 :even ， 或 高 级 的 CSS 选 择符:nth-child()为表格添加条纹效果，以及如何使用连缀的jQuery方法突出显示某个表格单元中的文本。  

### 练习

```js
  // 给位于嵌套列表第二个层次的所有<li>元素添加special类
  $('#selected-plays > li >ul >li ').addClass('special');
  $('li').children().find('li').addClass('special');

  $("td:nth-child(3)").addClass("year");
  $('tr').find('td:eq(2)').addClass('year');

  $('tr').find('td:eq(2)').addClass('year');
  $('td:contains(Tragedy)').parent('tr:eq(0)').addClass('special');
	
 	$('a').parent().nextAll().addBack().addClass('afterlink');
  $('li > a').parent().siblings().not('li:has(a)').addClass('afterlink');

  $('a[href$=\"pdf\"]').closest('ul').addClass('tragedy');
  $('a[href$=".pdf"]').parent().parent().addClass('tragedy');
```

------

## 事件

​	JavaScript内置了一些对用户的交互和其他事件给予响应的方式。为了使页面具有动态性和响应性，就需要利用这种能力 。

- 在页面就绪时执行JavaScript代码；
- 处理用户事件，比如鼠标单击和按下键盘上的键；
- 文档中的事件流，以及如何操纵事件流；
- 模拟用户发起的事件。  

### 在页面加载后执行任务  

​	$(document).ready()事件处理程序可以用来触发函数中的代码 。

#### 代码执行的时机选择

> ​	$(document).ready()   vs  window.onload ()  这两个有类似的效果，但是在触发操作的时间上存在着微妙的差异，这种差异只有在加载的资源多到一定程度时才会体现出来。  
>
> ​	当文档完全下载到浏览器中时，会触发window.onload事件。这意味着页面上的全部元素对JavaScript而言都是可以操作的，这种情况对编写功能性的代码非常有利，因为无需考虑加载的次序。
> ​	另一方面，通过$(document).ready()注册的事件处理程序，则会DOM完全就绪并可以使用时调用。虽然这也意味着所有元素对脚本而言都是可以访问的，但是，却不意味着所有关联的文件都已经下载完毕。换句话说，当HTML下载完成并解析为DOM树之后，代码就可以运行。  
>
> [更通俗解释差别](https://www.cnblogs.com/jiajia123/p/6107748.html)

> 加载样式与执行代码
> 	为了保证JavaScript代码执行以前页面已经应用了样式，最好是在<head>元素中把<link rel="stylesheet">标签和<style>标签放在<script>标签前面。  

​	**一般来说**， 使用$(document).ready()要优于使用onload事件处理程序，
但必须要明确的一点是，因为支持文件可能还没有加载完成，所以类似图像的
高度和宽度这样的属性此时则不一定会有效。如果需要访问这些属性，可能就
得选择实现一个**onload事件**处理程序（或者是使用jQuery为load事件设置处理

#### 基于一个页面执行多个脚本

​	通过js注册事件处理程序的传统机制：把一个函数指定给DOM元素的对应属性  

> 引用函数与调用函数：
> 	这里在将函数指定为处理程序时，省略了后面的圆括号，只使用了函数名。
> 	如果带着圆括号，函数会被立即调用；没有圆括号，函数名就只是函数的标识符或函数引用，可以用于在将来再调用函数。  

#### .ready()的简写形式

```
$(document).ready(
function(){
这里是代码
})
等价于
$(function(){
这里是代码
})
```

#### 向.ready()回调函数中传入参数

​	在某些情况下，可能有必要在同一个页面中使用多个JavaScript库。由于很多库都使用$标识符（因为它简短方便），因此就需要一种方式来避免名称冲突。
为解决这个问题， jQuery提供了一个jQuery.noConflict()方法，调用该方法可以把对$标识符的控制权让渡还给其他库。使用jQuery.noConflict()方法的一般模式如下：  

```js
<script src="prototype.js"></script>
<script src="jquery.js"></script>
<script>
jQuery.noConflict();
</script>
<script src="myscript.js"></script>
```

​	首先，包含jQuery之外的库（这里是Prototype）。然后，包含jQuery库，取得对$的使用权。
​	接着，调用.noConflict()方法让出$，以便将控制权交还给最先包含的库（ Prototype）。这样就可以在自定义脚本中使用两个库了——但是，在需要使用jQuery方法时，**必须记住要用jQuery，而不是$来调用**。  

```js
// 一个在.ready()方法中使用$的技巧
jQuery(document).ready(function($) {
//在这里，可以正常使用!
});
或者，也可以使用刚刚介绍的简写语法：
jQuery(function($) {
//使用$的代码
});
```

### 处理简单的事件

​	除了页面加载事件之外，对其他事件处理方式（hook）的缺点也jQuery也提出一种改进方式。

#### 简单的样式转换器

> 渐进增强
>
> 在创建样式转换器时，优秀的Web开发人员应该遵守渐进增强的原则。第5
> 章还会学习怎么在jQuery代码中向样式转换器内注入内容，让禁用JavaScript的用户看不到与功能无关的控件。  

```html
<div id="switcher" class="switcher">
<h3>Style Switcher</h3>
<button id="switcher-default">
Default
</button>
<button id="switcher-narrow">
Narrow Column
</button>
<button id="switcher-large">
Large Print
</button>
</div>
```

对于添加迪点击事件：可以选择on()方法。

```js
$('#switcher-default').on('click'.function(){
$('body').addclass('large')
})
```

#### 启用其他按钮

```js
$(document).ready(function() {
$('#switcher-default').on('click', function() {
$('body').removeClass('narrow');
$('body').removeClass('large');
});
$('#switcher-narrow').on('click', function() {
$('body').addClass('narrow');
$('body').removeClass('large');
});
$('#switcher-large').on('click', function() {
$('body').removeClass('narrow');
$('body').addClass('large');
});
});
```

#### 利用事件处理程序的上下文

​	当触发任何事件处理程序时，关键字this引用的都是携带相应行为的DOM元素。前面我们谈到过， $()函数可以将DOM元素作为参数，而this关键字是实现这个功能的关键①  。① 即允许向$()函数传递DOM元素，也是为了更方便地将引用DOM元素的this转换为jQuery对象。  

```js
$(this).addClass('selected');
```

```js
$(document).ready(function() {
$('#switcher-default')
.addClass('selected')
.on('click', function() {
$('body').removeClass('narrow');
$('body').removeClass('large');
$('#switcher button').removeClass('selected');
$(this).addClass('selected');
});
$('#switcher-narrow').on('click', function() {
	$('body').addClass('narrow');
	$('body').removeClass('large');
	$('#switcher button').removeClass('selected');
	$(this).addClass('selected');
});
```

第一，在通过对.on()的一次调用为每个按钮都绑定相同的单击事件处理程序时， 隐式迭代机制再次发挥了作用。

第二， **行为队列机制**让我们在同一个单击事件上绑定了两个函数，而且第二个函数不会覆盖第一个函数。jQuery总是按照我们**注册的顺序来触发事件处理程序。**  

最后，我们使用jQuery的连缀能力将每次添加和移除类的操作压缩到了一行代码中。  

#### 使用事件上下文进一步减少代码

​	对于`removeClass()`，他的参数是可选的，如果里面没有参数的话就会移除元素中所有的类。

#### 简写的事件

​	鉴于为某个事件（例如简单的单击事件）绑定处理程序极为常用， jQuery提供了一种简化事
件操作的方式——**简写事件方法**，简写事件方法的原理与对应的.on()调用相同，**可以减少一定**
**的代码输入量**。  

```js
不使用.on()而使用.click()可以将前面的样式转换器程序重写
$(document).ready(function() {
$('#switcher-default').addClass('selected');
$('#switcher button').click(function() {
var bodyClass = this.id.split('-')[1];
$('body').removeClass().addClass(bodyClass);
$('#switcher button').removeClass('selected');
$(this).addClass('selected');
});
})
```

#### 显示和隐藏高级特性

> 这里所谓的高级特性就是指为页面提供样式切换能力的样式转换器  

jQuery也为我们提供了一个简便的toggleClass()方法，能够根据相应的类是否存在而添加或删除类  

```js
$(document).ready(function() {
$('#switcher h3').click(function() {
$('#switcher button').toggleClass('hidden');
});
});
```

### 事件传播

​	在说明基于通常不可单击的页面元素①处理单击事件的能力时，我们构思的界面中已经给出
了一些提示——样式表切换器标签（即<h3>元素）实际上都是活动的，随时等待用户操作。  

​	jQuery的.hover方法。这个方法可以让我们在鼠标指针进入元素和离开元素时，通过JavaScript来改变元素的样式——事实上是可以执行任意操作。

​	.hover()方法接受两个函数参数。第一个函数会在鼠标指针进入被选择的元素时执行，而第二个函数会在鼠标指针离开该元素时触发。我们可以在这些时候修改应用到按钮上的类，从而实现翻转效果  

​	**.hover()也意味着可以避免JavaScript中的事件传播（ event propagation）导致的**
**头痛问题。要理解事件传播的含义，首先必须搞清楚JavaScript如何决定由哪个元素来处理给定的**
**事件。**  

#### 事件的旅程

​	当页面上发生一个事件时，每个层次上的DOM元素都有机会处理这个事件。以下面的页面
模型为例：  

```html
<div class="foo">
<span class="bar">
<a href="http://www.example.com/">
The quick brown fox jumps over the lazy dog.
</a>
</span>
<p>
How razorback-jumping frogs can level six piqued gymnasts!
</p>
</div>
```

![image-20210222113823761](/../图片/image-20210222113823761.png)

​	从逻辑上面看，任何事件都可能会有多个元素负责响应。

​	举例来说，如果单击了页面中的链接元素，那么<div>、 <span>和<a>全都应该得到响应这次单击的机会。毕竟，这3个元素同时都处于用户鼠标指针之下。而<p>元素则与这次交互操作无关。  

​	**允许多个元素响应单击事件的一种策略叫做事件捕获**①。在事件捕获的过程中，事件首先会交给最外层的元素，接着再交给更具体的元素。在这个例子中，意味着单击事件首先会传递给<div>然后是<span>然后是<a>

![image-20210222132954509](/../图片/image-20210222132954509.png)

​	另一种相反的策略叫做**事件冒泡**。即当事件发生时，会首先发送给最具体的元素，在这个元
素获得响应机会之后，事件会向上冒泡到更一般的元素。在我们的例子中， <a>会首先处理事件，
然后按照顺序依次是<span>和<div>  

![image-20210222133016349](/../图片/image-20210222133016349.png)

​		毫不奇怪，不同的浏览器开发者最初采用的是不同的事件传播模型。因而，最终出台的DOM
**标准规定应该同时使用这两种策略**：首先，事件要从一般元素到具体元素逐层捕获，然后，事件
再通过冒泡返回DOM树的顶层。而事件处理程序可以注册到这个过程中的任何一个阶段。
为了确保跨浏览器的一致性，而且也为了让人容易理解， jQuery始终会在模型的冒泡阶段注
册事件处理程序。因此，我们总是可以假定最具体的元素会首先获得响应事件的机会。  

​		为了确保跨浏览器的一致性，而且也为了让人容易理解， jQuery始终会在模型的冒泡阶段注
册事件处理程序。因此，我们总是可以假定最具体的元素会首先获得响应事件的机会 .

#### 事件冒泡的副作用  

​	事件冒泡可能会导致始料不及的行为，特别是在错误的元素响应mouseover或mouseout事件的情况下。  

### 通过事件对象改变事件的流程

​	为了展示一种.hover()也无能为力的情况①，需要改变前面实现的折叠行为。  





## jQuery面试问题综合