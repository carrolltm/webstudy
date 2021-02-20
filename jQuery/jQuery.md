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

















## jQuery面试问题综合