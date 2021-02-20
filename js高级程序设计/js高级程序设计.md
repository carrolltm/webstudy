---
typora-root-url: 图片
typora-copy-images-to: 图片
---

[TOC]



# js高级程序设计

## 第一章：js 简介

### js实现(三部分）

#### ECMAScript

对实现该标准规定的各个方面内容的语言的描述。

#### DOM（文档对象模型）

这并不是针对JS的，别的语言也有。

#### BOM（浏览器对象模型）

只处理浏览器窗口和框架。

## 第二章：HTML中是使用js

## 第三章：基本概念

### 函数

return语句也可以不带有任何返回值，在这种情况下，函数在停止执行后将返回undefined值。这种用法一般用在需要提前停止函数执行而又不需要返回值的情况下。可以直接**return；**

#### 理解参数

函数接受的参数在内部是用一个数组来表示的所以参数个数无所谓，实际上在函数体内可以通过arguments对象来访问这个参数数组，从而获取传递函数的每一个参数。

可以在函数内**不显示**使用arguments[i]（类似数组）使用命名参数，而且这样可以让函数接收任意个参数并分别实现适当的功能。

```
arguments[0,1,2,....]像数组一样调用。
arguments.length 判断传入的参数数目，跟函数里面写的形参数目有可能不一样。arguments的长度是由传入的参数个数（调用时传入的）决定的，不是函数形参个数决定的。
```

```js
				function howmanyArgs(){
            alert(arguments.length) ;
        }

        howmanyArgs("string",45);  //2
        howmanyArgs();             //0
        howmanyArgs(12);           //1
```

##### arguments和形参的区别

- 两个可以**类似**等同，也可以在函数内都使用到。
- arguments[i]的值变换，第i个形参（如果写了）的值也会变化。但是他们的内存空间是独立的，但他们的值是同步，这种同步是单向的，即arguments变化则形参变化。
- 没有传入值得命名参数（形参）自动被赋予undefined值。
- ES中所有参数传递得都是值，**不可能**通过**引用**传递参数。

#### 没有重载

ES函数没有签名，因为其参数是由零或多个值得数组来表示得。而没有函数签名，**真正得重载**是不可能实现得。

注：如果实现两个名字相同得函数，则该名字只属于后定义得函数。

```js
function add(num){
	return num+10;
}
function add(num){
	return num+20;
}
var res=add(100);    //300

```

**但是：**通过检查传入函数中参数得类型和数量并作出不同得反应，可以模仿方法得重载。

```js
			function add(num) {
        return num + 10;
      }
      function add(num,num2) {
          console.log(arguments.length);    //3
        return num + 20;
      }

      var res = add(100,200,300); 
      console.log(res);   // 120
```

但是个数超所有命名参数，则按最上面一条规则来，即后一个函数生效。

## 第四章：变量，作用域和内存问题

由于不存在定义某个变量必须要保存何种数据类型值的规则，变量的值及其数据类型可以在脚本的生命周期内改变。

### 基本类型和引用类型的值

- 基本类型：undefined，null，Boolean，nmber，string

- 引用类型：object

   引用类型是保存在内存中的对象。js不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。

### 动态的属性

引用类型的变量可以动态添加属性，但是基本数据类型不能添加属性。

### 赋值变量值

​	一个变量向另外一个变量赋值基本类型的值，会在变量对象上创建一个新值。然后把该值复制到为新变量分配的位置上。

```js
var num1=5;
var num2=num1;
```

![image-20210116150910039](/image-20210116150910039.png)

 	当从一个变量向另外一个变量复制引用类型的值时，同样也会将存储变量中的值复制一份到新变量分配的空间中。

​	不同的是，这个值的副本**实际**上是一个指针，而这个指针指向存储在堆中的一个对象。复制操作结束后，两个变量实际将引用同一个对象。因此，改变其中一个变量就会影响另外一个变量。

```js
var obj1= new Object();;
var obj2=obj1;
obj1.name="Nicholas";
alert(obj2.name);
```

![image-20210116151544085](/image-20210116151544085.png)

### 传递参数

**对于函数参数的传递**

- 所有函数的参数**都是**按值传递的。
- 把函数外部的值复制给函数内部的参数，就像把值从一个变量复制到另一个变量一样。
- 基本类型值的传递如同基本类型变量的复制一样，而引用类型的传递，则如同引用类型变量的赋复制一样。
- 在像参数传递一个基本类型的值时，**被传递的值会被复制给一个局部变量**。在向参数传递引用类型的值时，会把**这个值在内存中的地址复制给一个局部变量**，因此这个局部变量的变化会**反映**在函数的外面。

值得注意得是对于

```js
function setName(){
	obj.name = "Nicholas";
	obj = new Object();
	obj.name = "Greg";
}

var person = new Object();
setName(person);
alert(person.name);     //"Nicholas"
```

function中的new的新对象是一个局部变量，而这个局部对象会在函数执行完毕后立即销毁。

### 检测类型

- 对于null和引用类型，使用**typeof**都是显示Object对象。对于声明变量但未初始化，则显示undefined。typeof操作符检测函数时，该操作符会返回“function”。
- instanceof：主要解决具体是什么对象的问题，对于所有 ”引用类型

instanceof  object都是true。

### 执行环境及作用域

​	执行环境简称环境。

#### 执行环境

​		定义了变量或函数有权访问的其他数据，决定了他们各自的行为。每个执行环境都有一个与之关联的**变量对象**，环境中定义的所有变量和函数都保存在这个对象中。我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用他。

​	![image-20210116160720361](/image-20210116160720361.png)

```js
var color = "blue";
function changecolor(){
	if(color ==="blue"){
		color="red";
	}
	else {
			color="blue";
	}
}
chanecolor();
alert(color);   
```

​	上面程序中函数changecolor中的**作用域链**包含两个对象：他自己的变量对象（其中定义着arguments对象）和全局环境的变量对象。因为可以在这个作用域链中找到他，所以可以在函数内部访问变量color。

------

```js
var color="blue";
function changcolor(){
	var anohercolor="red";
	
	function swapcolors(){
		var tempcolor = anothercolor;
		anothercolor = color;
		color = tempcolor;
		
		// 这里可以访问color，another和tempcolor
	}
	// 这里可以访问到color和anothercolor，但不能访问tempcolor
	swapcolors();
}
changecolor();
```

![image-20210116193909998](/image-20210116193909998.png)

​	这里有三个执行环境。

------

#### 延长作用域链

​	有些语句可以在作用域链的前端临时增加一个变量对象，该变量对象会在代码执行后被移除。

```js
有以下两种情况
try-catch语句的catch块;
with语句
```

这两个语句都会在作用域链的前端添加一个变量对象。

------

#### 没有块级作用域

​	值得注意的是，ES5中没有块级作用域的概念，即if和for语句中声明的var变量也会在外面可以访问。

##### 声明变量

  	如果函数内部的变量初始化的时候没有使用var声明，该变量会自动添加到全局环境。

#### 查询标识符

​	当在某个环境中为了读取或写入而引用一个标识符时，**必须通过搜索来确定该标识符实际代表什么**。搜索过程从作用域链的前端开始，**向上逐级**查询与给定名字匹配的标识符。如果在局部环境中找到了该标识符，搜索过程停止，变量就绪。如果在局部环境中没有找到该变量名，则继续沿着作用域链向上搜索。搜索过程将一直追溯到全局环境的变量对象。如果在全局环境中也没有这个标识符，则意味着该变量没有声明。

```js
var color = "blue";
function getcolor(){
	return color;
}
alert(getcolor());     //"blue"
```

![image-20210116204350298](/image-20210116204350298.png)

​	**值得注意的是：**

​	如果存在一个局部的变量的定义，则搜索自动停止，不再进入另外一个变量对象。

```js
var color="blue";
function getcolor(){
	var color = "red";
	return color;
}
alert(getcolor());   // red
```

​	上面程序也可以使用window.color来访问全局的color。

```js
var  color = "blue";
      function getcolor() {
        var color = "red";
        return color;
      }
      console.log(getcolor()); // red
      console.log(color);   //blue
```

 	上面function里面color类似于一个局部变量，在函数执行之后销毁。

------

### 垃圾收集

​	[前端面试：js垃圾回收机制](https://www.cnblogs.com/fundebug/p/javascript-memory-garbage-collection.html)

​	js具有自动垃圾收集机制。也就是说执行环境会负责管理代码执行过程中使用的内存。这种垃圾回收机制的原理其实很简单：找出那些不再继续使用的变量然后释放其占用的内存。因此，垃圾收集器是按照固定的时间间隔周期性的执行这一操作。

**标记无用变量的策略**

#### 标记清除

​	这是最常用的垃圾收集方式。

#### 引用计数

​	跟踪记录每一个值被引用的次数，当声明一个变量并将一个**引用类型值**赋给该变量时，这个值的引用次数就是1。如果同一个值 又被赋给另一个变量，则该值的引用次数加1。如果包含对这个值引用的变量又取得了另外一个值，则这个值得引用次数减1.当这个值的引用次数变成0时，就会将其占用的内存回收回来。

```js
function problem(){
	var obj1=new Object();
	var bj2 =new Object();
	obj1.somepterobj=objectB;
	obj2.anotherobj=obj1;
}
```

​	上面的**循环引用**次数永远不会是0。内存无法得到回收。

#### 性能问题

​	对垃圾回收的时间间隔做一个优化判断处理。

#### 管理内存

​	js中分配给web浏览器的可用内存数量通常比分配给桌面应用程序的少。这是出于安全方面的考虑。

​	解除引用：一旦数据不再有用，最好通过将其值设置为null来释放其引用。

​	**注意**：解除一个值的引用并不意味着自动回收该值所占用的内存。解除引用真正作用是让值脱离执行环境，以便垃圾收集器下次运行时将其回收。

![image-20210116213431938](/image-20210116213431938.png)

------

## 第五章：引用类型

### Function类型

#### 没有重载（深入理解）

#### 函数声明与函数表达式

  	实际上，解析器在向执行环境中加载数据时，对**函数声明**和**函数表达式**并非一视同仁。解析器会率先读取函数声明，并使得在其执行环境任何代码之前都可以访问，至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行。	

```js
alert(sum(10,10));
function sum(num1+num2){
	return num1+num2;
}
```

​	以上代码可以完全运行，代码开始执行之前，解析器就已经通过一个**函数声明提升**的过程，并将函数声明添加到执行环境中。

​	对代码求值时，js引擎会在第一遍会声明函数并将它们放在源代码树的顶部。所以，即使声明函数的代码在调用它的代码后面，js引擎也能把函数声明提升到顶部。

```js
alert(sum(10,10));
var sum = function(num1,num2){
	return num1+num2;
}
```

​	以上代码发生错误，原因在于**函数处于一个初始化语句**中，而不是一个函数声明。在执行到函数所在的语句之前，变量sum中不会保存有对函数的引用;而且，由于第一行代码就会导致”unexpected identifier“（意外标识符）。

​	**除了什么时候可以通过变量访问函数这一点区别外，函数声明与函数表达式的语法其实是等价的。**

------

#### 函数内部属性

​	函数内部的属性中，包含arguments和this两个特殊的对象。arguments是类数组对象，包含着传入函数中的所有参数。

​	**利用arguments中callee属性**，该属性是一个指针，指向拥有这个arguments对象的函数。

```
// 经典递归函数
function factor(num){
	if(num<=1){
		return 1;
	}else{
			// 常规做法
			return num*factor(num-1);
			// 利用calee属性，这样对于函数改名之类的就不用再担心。
			return num*arguments.callee(num-1);
	}
}
```

​	对于this：function单独放在全局作用域内，那么他的this指向的是window，如果外面有其他”包装"，那么他的this指向包装他的对象。

------

#### 函数属性和方法



​	因为函数是对象，因此函数也有属性和方法。每个函数都包含两个属性：**length和prototype**。其中，**length属性表示函数希望接收的命名参数的个数**。

##### prototype（非常重要）

​	对于引用类型而言，**prototype是保存它们所有实例方法的真正所在**。

换句话说，诸如toSting(),valueOf()等方法实际上都保存再prototype的名下，只不过是**通过各自对象的实例访问**罢了。ES5中，prototype属性是不可以枚举的。

​	每个函数**都包含两个非继承而**来的方法：**apply()，call()**。这两个方法的用途都是在特定的作用域中调用函数，实际上等于函数体内设置this对象的值。

------

## 第六章：面对对象的程序设计

### 理解对象

​	面对对象的语言都有一个标准：他们都有类的概念。而通过类可以创建任意多个具有相同属性和方法的对象。

​	每个对象都是基于一个引用类型创造的。严格，这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字映射到一个值。**将函数的对象想象成散列表来理解。**

#### 属性类型

​	ES5在定义**只有内部才用**的特性，描述了属性的各种特征。为了表示特性是内部值，该规范把它们放在两对儿方括号中。例如[[Enumerable]]。

​	ES中有两种属性：**数据属性**和**访问属性**。

##### 数据类型

![image-20210118113139923](/image-20210118113139923.png)

​	如果要修改属性默认的特性，必须使用ES5的Object.defineProperty()方法。这个方法接收三个参数：属性所在的对象，属性的名字和一个描述符对象。其中，描述符对象的属性必须是：configurable，enumerale，writerable和value。

```js
      var person = {};
      Object.defineProperty(person, "name", {
        writable: false,
        value: "Nicholas",
      });
      alert(person.name); // "Nicholas"
      person.name = "Greg";
      alert(person.name);  // "Nicholas"
```

##### 访问器属性

- ​	读取访问器属性的时：会调用getter函数，这个函数复制返回有效的值。

- ​	写入访问器属性时，会调用setter函数并传入新值，这个函数负责决定如何处理数据。

  仍然也有四个属性值，访问器属性不能直接定义，必须通过Object.defineProperty()来定义。

![image-20210118114721235](/image-20210118114721235.png)

**注释**：_year前面的下划线是一种常用的记号，表示只能通过对象方法访问的属性

#### 定义多个属性

这个方法接收两个参数：

- 第一个对象是要添加和修改其属性的对象
- 第二个对象的属性与第一个对象中要添加或修改的属性一一对应。

![image-20210118115546982](/image-20210118115546982.png)

![image-20210118115630500](/image-20210118115630500.png)

#### 读取属性的特征

​		Object.getOwnPropertyDescriptor()

------

### 创建对象

#### 工厂模式

​	用函数来封装以特定接口创建对象的细节

```js
      function createPerson(name, age) {
        var o = new Object();
        o.name = nae;
        o.age = age;
        o.sayName = function () {
          alert(this.name);
        };
        return o;
      }
      var person1 = createPerson("Nicholas", 29);
      var person2 = createPerson("Greg", 27);
```

​	可以无数次调用这个函数，解决了多个相似对象的问题，但却没有解决对象识别的问题。

#### 构造函数模式

​	使用自定义的构造函数，从而定义自定义对象类型的属性和方法。

```js
      function Person(name, age) {
        this.name = name;
        this.age = age;
        this.sayName = function () {
          alert(this.name);
        };
      }
      var person1 =new Person("Nicholas", 29);
      var person2 =new  Person("Greg", 27);
			
			// 这些参数应该都在实例中，详情看下面原型对象
```

​	**注意**：我们一把将构造函数的**函数名首字母大写**

对于下面创建person新实例的操作，必须是使用new操作符。

```js
var person1 = new Person("Greg",27);

1：创建一个新的对象；
2：将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
3：执行构造函数中的代码（为这个新对象添加属性）；
4：返回新对象
```

对于上面两个person都有一个constructor（构造函数）属性，该属性指向Person.

##### 将构造函数当作函数

​	**任何函数，只要通过ew操作符来调用，那它们就可以作为构造函数，而任何函数，如果不通过new操作符来调用，那它跟普通函数也不会有什么两样。**

##### 构造函数的问题

​	使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。以这种方式创建函数，会导致不同的作用域链和标识符解析

```js
alert(person1.sayName == person2.sayName);   // false
```

​	 有时候，创建两个完成同样任务的Function实例的确没有必要；况且有this对象在，根本不用在执行代码前就把函数绑定到特定对象上面。

```js
// 构造函数转移到函数外部
function Person(name){
	this.name = name;
	this.sayName = sayName;
}

function sayName(){
	alert(this.name);
}

var person1 = new Person("Nicholas")
var person1 = new Person("Greg")

console.log(person1.sayName== person2.sayName); //true
```

​		person1和person2对象共享了在全局作用域中定义的同一个sayName()函数。

#### 原型模式

​	避免构造函数模式那种定义很多全局函数的操作。

​	**每个函数都有一个prototype(原型)属性**，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

​	使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。**意思就是将信息直接添加到原型对象中**。

```js
      function Person() {
        Person.prototype.name = "Nicholas";
        Person.prototype.age = 29;
        Person.prototype.sayName = function () {
          alert(this.name);
        };
      }
      var Person1 = new Person();
      Person1.sayName(); // "Nicholas"

      var Person2 = new Person();
      Person2.sayName(); // "Nicholas"

      alert(Person1.sayName == Person2.sayName); // true
```

​	值得注意的是：

```js
      function Person(name, age) {
        Person.prototype.name = name;
        Person.prototype.age = age;
        Person.prototype.sayName = function () {
          console.log(this.name);
        };
      }
      var Person1 = new Person("Nicholas", 29);
      Person1.sayName(); // "Nicholas"

      var Person2 = new Person("Greg", 20);
      Person2.sayName(); // "Greg"
      Person1.sayName(); // "Greg"

      alert(Person1.sayName == Person2.sayName); // true
```

​	这里person1和person2都是访问同一组属性和同一个sayName()函数。

##### 理解原型对象

​	无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype，这个属性指向函数的原型对象。

​	**默认情况下，所有原型对象都会自动获得一个constructor（构造函数）属性**，这个属性包含一个指向prototype属性所在函数的指针。

```
Person.protortype.constructor 指向Person
```

> ​	JavaScript 常被描述为一种**基于原型的语言 (prototype-based language)**——每个对象拥有一个**原型对象**，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为**原型链 (prototype chain)**，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。
>
> ​	准确地说，这些属性和方法定义在Object的构造器函数(constructor functions)之上的`prototype`属性上，而非对象实例本身。

​	![image-20210118151422465](/image-20210118151422465.png)

​	注意的是：person1和person2中都有一个内部属性，在chrome等浏览器在每个对象上都支持一个属性proto，而在其他实现中，这个属性对脚本是完全不可见的。

​	虽然在所有实现中都无法访问到[[Prototype]]，但可以通过isPrototype()方法来确定对象之间是否存在这种关系。

```js
Person.prototype.isPrototypeOf(person1); // true
```

ES5中可以这样做，这个方法返回[[Prototype]]的值。

```js
Object.getPrototype(person1) == Person.prototype;// true
Person.getPrototype(person1).name;  // "Nicholas"
```

![image-20210118152740285](/image-20210118152740285.png)

![image-20210118152752668](/image-20210118152752668.png)

```js
  function Person(name, age) {
    Person.prototype.name = name;
    Person.prototype.age = age;
    Person.prototype.sayName = function () {
      console.log(this.name);
    };
  }
  var Person1 = new Person("Nicholas", 29);
  Person1.name = "tang";
  var Person2 = new Person("Greg", 20);
	
  Person2.sayName(); // "Greg" 来自原型
  Person1.sayName(); // "tang" 来自实例

  alert(Person1.sayName == Person2.sayName); // true
```
​	上面person1的name的值被一个新值给屏蔽了。但无论访问person1.name还是person2.name都能够正常的返回值。

 **总之只能屏蔽原型中的值，但不能修改。**

 	使用hasOwnproperty方法检测一个属性是存在实例中还是存在原型中。存在实例中返回true。

##### 原型与in操作符

​	两种方法使用in操作符：单独使用和for-in循环中使用。

   单独使用：in操作符会在通过对象能够访问给定属性时返回true，无论该属性存在于实例还是原型中。

```js
//前面程序中
"name" in person1;  // true
"name" in person2;  // true
```

要取得对象上所有可枚举的实例属性，可以使用Object.keys()方法。这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。

```js
// 返回的是一个数组
var keys = Object.keys(Person.prototype);
alert(keys);     // "name,age,job,sayName"
```

```
var keys =Object.getOwnPropertyNames(Person.prototype);
alert(keys);  // "constructor,name,age,job,sayName"
```

上面结果包含了不可枚举的construcor属性。

##### 更简单的原型写法

​	直接一次性的对象**字面量**来重写整个原型对象。

```js
      function Person() {}
      Person.prototype = {
        name: "Nicholas",
        age: 29,
        sayName: function () {
          alert(this.name);
        },
      };
```

​	值得注意的是：上面的constructor的值指向的不是person而是Object，如果仍然想指向person，指需要在字面量里面加上

```js
constructor : Person,
```

但是constructor会变成可枚举的，如果想变成默认不可枚举的话。

```js
  Object.defineProperty(person.prototype, "constructor", {
    enumerable : false,
    value: Person
  });
```
##### 原型的动态性

​	我们对原型对象所作的任何修改都能够立即从实例上反映出来-**即使是先创建了实例后修改原型也照样如此**。

```
var friend = new Person();
Person.prototype.sayHi = function(){
	alert("hi");
}
friend.sayhi();  // "hi(没有问题)
```

​	如果重写这个原型对象

```js
      function Person() {}
      let friend = new Person(); // undefined
      Person.prototype = {
        constructor:Person,
        name: "Nicholas",
        age: 29,
        sayName: function () {
          alert(this.name);
        },
      };
      let friend = new Person(); // "Nicholas" 没问题
      console.log(friend.name); 
// 所有只能放在后面，感觉类似与非响应式
```

对于上面的friend定义的位置得到不同的结果。可以得到

```js

      var A = function() {};
      A.prototype.n = 1;
      var b = new A();
      A.prototype = { n: 2, m: 3 };
      var c = new A();
      console.log(b.n);
      console.log(b.m);
      console.log(c.n);
      console.log(c.m);
	  // 1 undefined 2 3
上面结果我认为可以这样考虑：
	 对于前面已经new的实例，它的portotype指向了原型对象，但是当重构prototype之后，如下图所示，出现new person prototype，但前面实例还是指向person prototype。
     对于重构prototype之后（重写整个原型对象）实现new的实例，它的prototype已经指向新的new person prototype。
```

![image-20210118163504516](/image-20210118163504516.png)

![image-20210118164028988](/image-20210118164028988.png)

##### 原生对象的原型

​	![image-20210118164522012](/image-20210118164522012.png)

​	![image-20210118164535698](/image-20210118164535698.png)

##### 原生对象的问题

​	共享的问题,对于包含**引用类型的属性**来说就比较恐怖了。

![image-20210118164842317](/image-20210118164842317.png)

这种共享是很恐怖的，所有我们很少使用原型模式的原因所在。

#### 组合使用构造函数模式和原型模式

​	看不下去了，改天看

#### 动态原型模式

可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型。

```js
// 动态原型模式
function obj(name){
    this.name = name
    if(typeof this.saihi!='function'){
        obj.prototype.saihi=function(){
            console.log(this.name);
        }
    }
}
let obj1 = new obj('123')
obj1.saihi()
```



#### 寄生构造函数模式

```js
      function createPerson(name, age) {
        var o = new Object();
        o.name = nae;
        o.age = age;
        o.sayName = function () {
          alert(this.name);
        };
        return o;
      }
      var person1 =new  createPerson("Nicholas", 29);
      var person2 = new createPerson("Greg", 27);
```



#### 稳妥构造函数模式

稳妥对象(durable objects)：没有公共属性，而且其方法也不引用this的对象叫作稳妥对象。

凡是想设为 private 的成员都不要挂到 person 返回的对象 o 的属性上面，挂上了就是 public 的了。

```js

function createPerson(name, age, job) {
    var o = new Object();
    //相当于private memebers
    var name = name;
    var age = age;
    //相当于public members
    o.job = job;  //稳妥构造函数模式不应该把属性写成o.job，这会让外部函数访问到他
    o.sayName = function() {
        alert(name);
    };
    o.sayAge = function() {
        alert(age);
    }
    return o;
}
var person1 = createPerson("Nicholas", 29, "Software Engineer");
person1.sayName();    //Nicholas
person1.sayAge();     //29
alert(person1.name);  //undefined
alert(person1.age);   //undefined

```

(1) 新创建对象的实例方法不能引用**this**

(2) 不使用new调用构造函数

这里没有使用this，也不用new调用构造函数。

可以看到alert是不能访问对象的name和age的，但是可以访问job

凡是想设为 private 的成员都不要挂到 Person 返回的对象 o 的属性上面，挂上了就是 public 的了。

------

------

### 继承

​	继承包括实现继承和接口继承，js里面只支持实现继承，其实现继承注意依靠原型链来是实现的。

#### 原型链

​	作为实现继承的主要方法，**基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。**

​	构造函数，原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。

![image-20210118184216394](/image-20210118184216394.png)

> JavaScript 常被描述为一种**基于原型的语言 (prototype-based language)**——每个对象拥有一个**原型对象**，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为**原型链 (prototype chain)**，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。
>
> 准确地说，这些属性和方法定义在Object的构造器函数(constructor functions)之上的`prototype`属性上，而非对象实例本身。
>
> 在传统的 OOP 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（它是__proto__属性，是从构造函数的`prototype`属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法。

```js
      function Supertype() {
        this.property = true;
      }
      Supertype.prototype.getSuperValue = function () {
        return this.property;
      };

      function Subtype() {
        this.subproperty = false;
      }
			// 
      Subtype.prototype = new Supertype();
      Subtype.prototype.getSubValue = function () {
        return this.subproperty;
      };

      var instance = new Subtype();
      alert(instance.getSuperValue());
```

![image-20210118185807574](/image-20210118185807574.png)

在上面的代码中，我们没有使用Subtype默认提供的原型，而是给它换了一个新原型：这个新原型就是Supertype的**实例**。于是，新**原型不仅具有作为igeSuperType的实例所拥有的全部属性和方法，而且_内部还有一个指针_，指向了SuperType的原型**。

​	最终结果：instance指向SubType的原型，SubType的原型又指向SuperType的原型。instance.constructor现在指向的是Supertype.这是因为原来Subtype.protype中的constructor被重写的缘故。

[^Subtype.protype中的constructor被重写]: 实际上，不是Subtype的原型constructor属性被重写了，而是Subtype的原型指向了另一个对象------Supertype的原型，而这个原型对象的constructor属性指向的是Supertype

   **注意实例属性和原型方法的位置**：property在Subtype的原型中，subproperly在instance实例中，因为这两个是实例对象。

```js
//Subtype.prototype现在是Supertype的实例
Subtype.prototype = new Supertype();
```

​	调用instance.getSuperValue()经历的三个步骤：

- 1：搜索实例

- 2：搜索Subtype.prototype

- 3：搜索SuperType.prototype，最后一步找到该方法

  在找不到属性或方法的情况下，搜索过程总是要一环一环的前行到原型链末端才会停下来。

##### 别忘记默认的原型

![image-20210118192032445](/image-20210118192032445.png)

![image-20210118192120768](/image-20210118192120768.png)

##### 确定原型和实例的关系

​	两种方式

1. instance操作符：测试实例与原型链中出现过的构造函数，结果就会返回true。（从下到上）

```js
instance instanceof Object; // true
instance instanceof SuperType; // true
instance instanceof SubType; // true
```

​    2.isPrototypeof():只要是原型链中出现过的原型，都可以说是该 原型链所派生的实例的原型。（从上到下）

```js
Object.prototype.isPrototypeOf(instance); // true
SuperType.prototype.isPrototypeOf(instance); // true
SubType.prototype.isPrototypeOf(instance); // true
```

##### 谨慎的使用定义方法

​	子类型重写超类型中的某个方法，或者需要添加超类型中不存在的某个方法。**一定需要将给原型添加方法的代码放在替换原型的语句之后**。

```js
  function Supertype() {
    this.property = true;
  }
  Supertype.prototype.getSuperValue = function () {
    return this.property;
  };

  function Subtype() {
    this.subproperty = false;
  }
		// 
  Subtype.prototype = new Supertype();
	// 添加新方法
  Subtype.prototype.getSubValue = function () {
    return this.subproperty;
  };
	// 重写超类型中的方法
	SubTyeprototype.getSubValue = function () {
    return false;
  };
  var instance = new Subtype();
  alert(instance.getSuperValue());  // false
```
​	不要使用字面量创建原型方法，这样就会重写原型方法。（**前面说过**：也可以写，但是需要额外该consructor，然后还有变成不可枚举的）

![image-20210118194104376](/image-20210118194104376.png)

 上面重写导致原型链被切断。

##### 原型链的问题

​	仍然是那个**共享**导致的问题。

<img src="/image-20210118194244505.png" alt="image-20210118194244505" />

![image-20210118194251135](/image-20210118194251135.png)

​		第二个问题是：创建子类型时候，不能向超类型的构造函数中传递参数，准确的来说应该是没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。

#### 借用构造函数

​	在子类型构造函数的内部调用超类型构造函数。函数只不过是在特定环境中执行代码的对象，因此使用apply()和call()方法也可以在（将来)新创建的对象上执行构造函数。

```js
      function SuperType() {
        this.color = ["red", "blue"];
      }
      function SubType() {
        // 继承了SuperType
        SuperType.call(this);
      }
      var instance1 = new SubType();
      instance1.color.push("black");   // red blue black
      alert(instance1.color);

      var instance2 = new SubType();  // red blue
      alert(instance2.color);
```

​	解决了共享问题，能够向超类传递参数同时不造成共享。

[^call和apply]: 每个函数**都包含两个非继承而**来的方法：**apply()，call()**。这两个方法的用途都是在特定的作用域中调用函数，实际上等于函数体内设置this对象的值。

![image-20210118200829227](/image-20210118200829227.png)



##### 借用构造函数的问题

​	超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式。

#### 组合继承

  组合继承也叫伪经典继承，将原型链和借用构造函数的技术组合到一块，从而发挥两者之长的一种继承模式。

```js
// 组合继承 
// 实例继承和 原型继承
function parent(){
    this.name= 'tang'
}
parent.prototype.age= '16'

function child(){
    this.friend= 'tim'
    parent.call(this)

}
child.prototype = new parent()

```



#### 原型式继承

#### 寄生式继承

```js
// 寄生式继承
function parents(name){
    let clone = new Object(name)
    clone.sayhi = function(){
      console.log('hello world');
    }
    return clone
}
let person={
    name:'jack',
    friends:['1','2']
}
let obj = new parents(person)
obj.sayhi();
```



#### 寄生组合式继承

​	对于组合式继承，会调用两次超类的构造函数，一组在原型上，一组在实例上，但是实例上的会屏蔽掉实例里面的。

借用构造函数来继承属性，通过原型链的混成形式来继承属性，通过原型链的混成形式来继承发。背后思路是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已本质上就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。

```js
// 寄生组合式继承
// 用一个额外的函数来直接继承原型
// 比起组合继承少调用一次超类的实例

function inherit(subtype,supertype){
    let clone = new Object(supertype.prototype)
    clone.constructor = subtype
    subtype.prototype = clone
    return clone
}

function supertype(){
    this.name = 'tang'
}

function subtype(){
    supertype.call(this)
}

inherit(subtype,supertype)
// 但是子类的原型添加方法必须再这后面，因为上一句相当于重写subtype的原型

let obj = new subtype()
console.log(obj.name);
```





## 第七章：函数表达式

​	函数声明存在声明提前的特征。

[参考](https://github.com/qianguyihao/Web/blob/master/04-JavaScript%E5%9F%BA%E7%A1%80/19-%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%92%8C%E5%8F%98%E9%87%8F%E6%8F%90%E5%8D%87.md)

对于

```js
      // 可以，存在变量提升
      sayHi();
      function sayHi() {
        alert("Hi");
      }
      // 错误
      sayHi();
      var sayHi = function () {
        alert("Hi");
      };

			// 不要这样做
			// 这在Es中属于无效语法，不同浏览器修正错误做法不一致
		if(cndition){
      function sayHi(){
        alert("Hi");
      }
    }else {
      function sayHi(){
        alert("Yo");
      }
    }
		// 可以这样做
		var sayHi;
		if(cndition){
      sayHi = function sayHi(){
        alert("Hi");
      }
    }else {
      sayHi = function sayHi(){
        alert("Yo");
      }
    }
```

### 递归

​	尽量使用arguments.callee()函数在函数内部实现调用。

​	在严格模式下，不能通过脚本访问arguments.callee,访问这个属性会导致错误。不过，可以使用**命****名函数表达式**来达成相同的结果。

```
var fator = (function f(num){
	if(num<=1){
		return 1;
	}else{
		return num*f(num-1);
	}
});
```

### 闭包

​	闭包是指有权访问另外一个函数作用域中的变量的函数。

​	常见方法是在一个函数内部创建另外一个函数。

#### 闭包与变量

​	因为作用域链导致的副作用：闭包只能取得包含函数中任何变量的最后一个值。

```js
    function create() {
        var result = new Array();

        for (var i = 0; i < 10; i++) {
          result[i] = function () {
            return i;
          };
        }
        return result;
      }
```

这个函数会返回一个函数数组。**但是每个函数都返回10**.因为每个函数的作用域链中都保存着createFunction()函数的活动对象，所有它们引用的都是同一个变量i。当createFunction()函数返回后，变量i的值是10，此时每个函数都引用着保存变量i。

**解决办法**

- 立即执行函数
- promise

##### 使用立即函数解决闭包

思路：匿名函数内的变量i与外部函数的变量i的引用关系断掉.因为函数参数是按值传递的。

```js
for (var a = 0; a <20; a++) {
           (function(index){
                    setTimeout(() => console.log(index), 1000) 
                })(a);
            }
```

##### 使用promise解决闭包

```js
 				const tasks=[];
        const output=function(index){
            new Promise(
              (resolve)=>{
                setTimeout(() =>{ console.log(index);  resolve()}, 10) ;
            })
        }         
 
        for (var a = 0; a <20; a++) {
                tasks.push(output(a));
            }
        Promise.all(tasks).then(()=>{
               console.log("全部打印成功");
            })
```

#### 关于this对象

​	this对象是在运行时基于函数的执行环境绑定的:

- 在全局函数中，this等于window
- 当函数被作为某个对象的方法调用时，this等于那个对象
- 匿名函数的执行环境具有全局性，因此this对象通常指向window。

  注意：call()和bind()的使用，导致函数执行环境的改变。

```js
      var name = "the window";
      var object = {
        name: "My object",
        getFun: function () {
          // 这才是匿名函数
          return function () {
            return this.name;
          };
        },
      };
	alert(object.getFun()());  // "The window"
```

要想能访问的是 "My Object"

```js
      var name = "the window";
      var object = {
        name: "My object",
        getFun: function () {
          var that=this;
          // 这才是匿名函数
          return function () {
            return that.name;
          };
        },
      };
	alert(object.getFun()());  // "The window"
```

![image-20210119084730266](/image-20210119084730266.png)

### 模仿块级作用域

### 私有变量

------

## 第八章：BOM

## window对象

​	它既是js访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象。这意味着网页中定义的任何一个对象，变量，和函数，都以window作为其Global对象，因此有权访问parseInt()对象。

### 全局作用域

```js
    <script>
      var age = 29;
      function sayage() {
        alert(this.age);
      }
      alert(window.age); //29
      sayage(); //29
      window.sayage(); // 29
    </script>
```

​	全局变量和window对象的属性有点差别：window对象属性可以使用delete删除，全局变量不能。

```js
      var age = 29;
      window.say = "red";

      delete window.age;
      delete window.say;

      console.log(window.age); // 29
      console.log(window.say); // undefined
```

### 窗口关系及框架

​	页面中包含框架，每个框架都拥有自己的window对象，并且保存在frames集合中。通过数值索引。

## 第二十章：Json

​	这是一种数据格式，而不是一种编程语言。虽然具有相同的语法形式，但Json并不从属于js。

### 语法

​	语法有三种类型的值：

![image-20210126110856985](/image-20210126110856985.png)

#### 简单值

​	对于字符串json中必须使用双引号。布尔值和null也是有效的Json形式。

#### 对象

```js
// 前面需要加上双引号
var obj = {
	"name":"nicholas",
	"age":29
}
```

#### 数组

```js
"name":["name1","name2",....]
```

## 解析和序列化

​	可以将json解析为有用的js对象。

​	JSon对象有两个方法：stringify()和parse()。在最简单的情况下，这两个方法分别用于把js对象序列化为JSON字符串和把JSON字符串解析为原生JS值。

![image-20210126111928579](/image-20210126111928579.png)

​	对于js中所有函数及原型对象都会被有意忽略，不体现在结果中。此外，值为undefined的任何属性也都会被跳过。结果中最终都是值为有效JSON数据类型的实例属性。

```js
var bocopy = JSON.parse(jsonText);
```

​	上面将JSON字符串变成相应的JS值。

#### 序列化选项

```js
JSON.stringify(json对象，过滤器(可以数组/函数),是否在JSON字符串中保留缩进);
```

​	过滤器填你想要的数据。

## 第二十二章：高级技巧

### 高级函数

#### 作用域安全的构造函数

```js
// 防止非new造成的影响
	function obj(name, age, work) {
        if (this instanceof obj) {
          this.age = age;
          this.name = name;
          this.work = work;
        } else {
          new obj(name, age, work);
        }
      }
      var obj1 = new obj("tang", 13, "IT");
      console.log(obj1.age);
```

## 第二十三章：离线应用与客户端存储

​	做到设备有电就能使用

- 确保应用知道设备是否能上网
- 应用还必须能访问一定的资源（图像，js，css）
- 有一块本地空间用于保存数据

### 离线检测

​	HTML5使用navigator.onLine属性检测设备是否能上网，从而反正正确的值。

​	![image-20210127133738874](/image-20210127133738874.png)

![image-20210127133908486](/image-20210127133908486.png)

![image-20210127133922221](/image-20210127133922221.png)

```
        EventUtil.addHandler(window, "online", function(){
            alert("online")
        });
        EventUtil.addHandler(window, "offline", function(){
           alert(""离线"")  ;
        });
```

​	现在浏览器**上面会报错**	

​	为了检测是否离线，在页面加载后，最好先通navigator.onLine取得初始状态，然后通过上述两个事件来确定网络连接状态是否变换。当上述事件触发时，navigator.onLine也会发生改变，不过必须手工轮询这个属性才能检测网络状态的变换。

### 离线/应用缓存

​	简称为appcache，是专门为开发离线Web应用而设计的。Appache就是从浏览器的缓存中分出来的一块缓存区。要想在这个缓存中保存数据，可以使用一个描述文件，列出要下载和缓存的资源。



### 在浏览器中保存数据

#### cookie

​	最初在客户端存储会话信息。该标准要求服务器任意的HTTP请求发送Set-Cookie HTTP头作为响应的一部分，其中包含会话信息。

![image-20210127161414445](/image-20210127161414445.png)

##### 限制

​	cookie是绑定在特定的域名下的。但是每个域能保存的cookie数量是有限的。而且浏览器对于cookie的尺寸也有限制。

##### cookie的构成

​	名称，值，域，路径，失效时间，安全标志

