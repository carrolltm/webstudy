---
typora-root-url: images
typora-copy-images-to: images
---

# vue3源码

## Vue与模板

使用步骤：

​	1：编写 页面模板

​			1：直接在HTML标签中写标签。

​			2：使用template

​			3：使用单文件（template（））

​			4：创建vue的实例

​	2：创建vue的实例

​			1：在vue的构造函数中提供你需要渲染数据所需要的东西(data,method,computed,watcher,props....)

​	3:将vue挂载到页面中.,如果是单文件的话，有一个mount方法去挂载到页面当中。

对于上面操作简单应用

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id='app'>
        <h1>{{name}}</h1>
        <h2>{{message}}</h2>
    </div>
    <script>
        let vue = new Vue({
            el:'#app',
            data:{
                name:'tang',
                message:'hello world'
            }
            
        })
        // 第三步的挂载vue.js自当帮我们实现了
    </script>
    
</body>
</html>
```

效果：

<img src="/image-20210222092020908.png" alt="image-20210222092020908" style="zoom:50%;" />

## 数据驱动模型

​	简单来说就是vue的一个执行流程

数据驱动：数据渲染我们的页面，得到我们想要的结果。

1：vue获得模板：模板中的“坑”

2：利用vue的构造函数提供的数据来“填坑”，可以在页面中显示的“标签”了。

3：将标签替换成页面中原有的标签：这就代表着前面标签不是一个了。

vue 利用原先的模板和提供的数据来生成了一个新的标签（node元素）来替换掉了页面中原先模板的位置。

```js
<body>
    <div id='app'>
        <h1>{{name}}</h1>
        <h2>{{message}}</h2>
    </div>
    <script>
        console.log(app);
        let vue = new Vue({
            el:'#app',
            data:{
                name:'tang',
                message:'hello world'
            }
            
        })
        // 第三步的挂载vue.js自当帮我们实现了
        console.log(app);
    </script>
</body>
```

<img src="/image-20210222092803597.png" alt="image-20210222092803597" style="zoom:80%;" />

上面打印出的结果：第一不高亮，第二个高亮。而且第二个已经填好坑了。

对于上面我们怎么实现：我们自己写一个。

关键如何将数据和模板相结合：递归，或者一些特殊的算法（队列等）。

现在这个案例中是一个Dom元素.

在真正的Vue源码中是字符串

字符串解析：Dom->字符串模板->虚拟Dom ->真正的Dom

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->
  </head>
  <body>
    <div id="app">
      <h1>{{name}}</h1>
      <h2>{{message}}</h2>
    </div>
    <script>
      console.log(app);
      // 1：得到模板
      let template = document.querySelector("#app");
      // 2：实例数据
      let data = {
        name: "tang",
        message: "hello world",
      };
      // 3将数据和模板结合,得到dom元素
      // 一般都是使用递归
      // 现在这个案例中是一个Dom元素.
      // 在真正的Vue源码中是字符串
      let r=/\{\{(.+?)\}\}/g;
      function compile(template,data){
        let child = template.childNodes;
        for(let i=0;i<child.length;i++){
            let type =child[i].nodeType; // 1元素  3:节点
            if(type==3){
                // 判断是不是文本节点
                let txt  = child[i].nodeValue; //该属性只有文本节点才有意义
                txt = txt.replace(r,function(_,g){
                    let key =g.trim();
                    let value = data[key];
                    return value;
                })
                // 注意txt和Dom元素是没有关系的
                child[i].nodeValue  = txt;
            }
            else if(type==1) {
                compile(child[i],data)
            }
        }
      }
  
      // 还需要判断子元素是否是文本节点 nodetype 1:元素 3:文本节点
      // 然后是文本节点的话还需要判断是双花括号：正则表达式

      compile(template,data)  // 调用

      console.log(app);
    </script>
  </body>
</html>

```

上面代码是我们没有生成新的template，所有在这里看到的前面console.log输出的是一样的结果。

优化：对Node拷贝一份

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->
  </head>
  <body>
    <div id="app">
      <h1>{{name}}</h1>
      <h2>{{message}}</h2>
    </div>
    <script>
      // 1：得到模板
      let template = document.querySelector("#app");
      // 2：实例数据
      let data = {
        name: "tang",
        message: "hello world",
      };
      // 3将数据和模板结合,得到dom元素
      // 一般都是使用递归
      // 现在这个案例中是一个Dom元素.
      // 在真正的Vue源码中是字符串
      let r = /\{\{(.+?)\}\}/g;
      function compile(template, data) {
        let child = template.childNodes;
        for (let i = 0; i < child.length; i++) {
          let type = child[i].nodeType; // 1元素  3:节点
          if (type == 3) {
            // 判断是不是文本节点
            let txt = child[i].nodeValue; //该属性只有文本节点才有意义
            txt = txt.replace(r, function (_, g) {
              let key = g.trim();
              let value = data[key];
              return value;
            });
            // 注意txt和Dom元素是没有关系的
            child[i].nodeValue = txt;
          } else if (type == 1) {
            compile(child[i], data);
          }
        }
      }

      let generateNode = template.cloneNode(true); // 拷贝一份
      console.log(template);
      compile(generateNode, data); // 调用

      //4:
      app.parentNode.replaceChild(generateNode, app);
      console.log(generateNode);
    </script>
  </body>
</html>

```

上面只是一个简单的思路，但是存在很大的问题

1：vue使用的是虚拟Dom，上面是真实Dom

2：只考虑了单属性({{name}})，vue中大量使用了层级({{child.name.firstname}})

3:上面操作只是一步一步，代码没有整合。

**改为构造函数**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->
  </head>
  <body>
    <div id="app">
      <h1>{{name}}</h1>
      <h2>{{message}}</h2>
    </div>
    <script>
      let r = /\{\{(.+?)\}\}/g;
      function compile(template, data) {
        let child = template.childNodes;
        for (let i = 0; i < child.length; i++) {
          let type = child[i].nodeType; // 1元素  3:节点
          if (type == 3) {
            // 判断是不是文本节点
            let txt = child[i].nodeValue; //该属性只有文本节点才有意义
            txt = txt.replace(r, function (_, g) {
              let key = g.trim();
              let value = data[key];
              return value;
            });
            // 注意txt和Dom元素是没有关系的
            child[i].nodeValue = txt;
          } else if (type == 1) {
            compile(child[i], data);
          }
        }
      }

      // 可读可改用下划线  只可读用 $
      function JGvue(options) {
        // 得到数据
        this._data = options.data;
        this._el = options.el;

        // 得到模板
        this.$el = this._templateDom = document.querySelector("#app");

        this_parent = this._templateDom.parentNode;
        // 渲染工作
        this.render();
      }
      // 将模板结合数据，得到HTML加到页面中
      JGvue.prototype.render = function () {
        this.compiler();
      };
      // 编译：将模板与数据结合  得到真正的DOM元素
      JGvue.prototype.compiler = function (template) {
        let realHTMLDOM = this._templateDom.cloneNode(true); //用模板 拷贝得到一个准DOM
        compile(realHTMLDOM, this._data);
        this.update(realHTMLDOM);
      };
      // 将DOM的元素放到页面中
      JGvue.prototype.update = function (real) {
        this_parent.replaceChild(real, document.querySelector("#app"));
      };

      let options = {
        el: "#app",
        data: {
          name: "tang",
          message: "miao",
        },
      };
      let vue = new JGvue(options);
    </script>
  </body>
</html>

```

​	上面的东西都是写死的。**实际上不是使用replaceChild**，而是每次数据变换产生虚拟Dom。页面标签已经被渲染，只是用虚拟Dom更新文本或其他数据。如果页面中没有被渲染，那么就会把虚拟Dom转换为真正的Dom。

​	上面也存在每次要渲染的时候，模板就要解析一次（注意：我们这里简化了解析方法）。

​	上面我们的也只考虑了单属性(name)，没有考虑层属性({name.firstname}})。

```js
    function GetvalueBypath(obj,path) {
        let paths = path.split(".");
        let res = obj;
        let prop;
        while ((prop = paths.shift())) {
          res = res[prop];
        }
        return res;
      }

```

怎么将我们的Dom转换为虚拟Dom，怎么将虚拟Dom转换到页面上去。

接下来目标：

1：将真正的Dom转换为虚拟Dom

2：将虚拟Dom转换为真正的Dom

## 虚拟DOM

将真正的DOM转换为虚拟DOM

将虚拟DOM转换为真正的DOM

思路与深拷贝类似。

虚拟DOM主要考虑到**性能**

虚拟Dom可以存储标签，文本，属性

```js
//div ->obj(tag:div)

// 文本节点=>{tag:undefined,value:‘文本节点''}

// div title='1' class="c"=>{tag:div,data:{title:"1},class:'c}
// <div><div></div></div>=>{tag:"div",children:{{tag:d"div}}}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->
  </head>
  <body>
    <div id="app">
      <div>
        <div id="jack">hello1</div>
        <div>hello2</div>
        <div>hello3</div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>
    <script>
      // 既要表示元素，又要表示文本节点
      class Vnode {
        constructor(tag, data, value, type) {
          // tag：标签名 data：描述一些属性 value
          this.tag = tag && tag.toLowerCase();
          this.data = data;
          this.value = value;
          this.type = type;
          this.children = [];
        }
        appendChild(vnode) {
          this.children.push(vnode);
        }
      }
      // 使用递归来遍历Dom元素来生成虚拟Dom
      // vue源码中是使用栈来存储父元素 来实现递归生成 ：将Dom元素解析为字符串

      function getVnode(node) {
        let nodeType = node.nodeType;
        let _vnode = null;
        if (nodeType === 1) {
          // 元素
          let nodename = node.nodeName;
          let attrs = node.attributes;
          let _attrObj = {};
          for (let i = 0; i < attrs.length; i++) {
            // attrs[i]属性节点(nodetype ==2)
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue;
          }
          _vnode = new Vnode(nodename, _attrObj, undefined, nodeType);

          // 还得考虑真正Dom元素的子元素
          let childNode = node.childNodes;
          for (let i = 0; i < childNode.length; i++) {
          
            _vnode.appendChild(getVnode(childNode[i])); // 递归
          }
        } else if (nodeType === 3) {
          _vnode = new Vnode(undefined, undefined, node.nodeName, nodeType);
        }
        return _vnode;
      }
      let app = document.querySelector("#app");
      let vapp = getVnode(app);
      console.log(vapp);
    </script>
  </body>
</html>

```

但是上面的结果会多一些#text段。因为

![image-20210223093323699](/image-20210223093323699.png)

![image-20210223093821337](/image-20210223093821337.png)

接下来就是将Vnode转换为真正得Dom。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->
  </head>
  <body>
    <div id="app">
      kajhd
      <div>
        <div id="jack">hello1</div>
        <div>hello2</div>
        <div>hello3</div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>
    <script>
      // 既要表示元素，又要表示文本节点
      class Vnode {
        constructor(tag, data, value, type) {
          // tag：标签名 data：描述一些属性 value
          this.tag = tag && tag.toLowerCase();
          this.data = data;
          this.value = value;
          this.type = type;
          this.children = [];
        }
        appendChild(vnode) {
          this.children.push(vnode);
        }
      }
      // 使用递归来遍历Dom元素来生成虚拟Dom
      // vue源码中是使用栈来存储父元素 来实现递归生成 ：将Dom元素解析为字符串

      function getVnode(node) {
        let nodeType = node.nodeType;
        let _vnode = null;
        if (nodeType === 1) {
          // 元素
          let nodename = node.nodeName;
          let attrs = node.attributes;
          let _attrObj = {};
          for (let i = 0; i < attrs.length; i++) {
            // attrs[i]属性节点(nodetype ==2)
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue;
          }
          _vnode = new Vnode(nodename, _attrObj, undefined, nodeType);

          // 还得考虑真正Dom元素的子元素
          let childNode = node.childNodes;
          for (let i = 0; i < childNode.length; i++) {
            _vnode.appendChild(getVnode(childNode[i])); // 递归
          }
        } else if (nodeType === 3) {
          _vnode = new Vnode(undefined, undefined, node.nodeName, nodeType);
        }
        return _vnode;
      }
      let app = document.querySelector("#app");
      let vapp = getVnode(app);
      console.log(vapp);

      // 将vnode转换为真正的Dom
      // document.createElement(nodename);
      // document.createTextNode(text);

      function parseVnode(vnode) {
        // 创建真实的dom
        // 判断vnode的类别
        let nodeType = vnode.type;
        let _node = null;
        if (nodeType === 1) {
          // 元素节点，然后还要给元素加上属性，然后还要子元素
          _node = document.createElement(vnode.tag);
          // 属性
          let data = vnode.data;
          Object.keys(data).forEach((key) => {
            let attrname = key;
            let attrvalue = data[key];
            _node.setAttribute(attrname, attrvalue);
          });
          // 子元素
          let children = vnode.children;
          children.forEach((subvnode) => {
            _node.appendChild(parseVnode(subvnode)); // 递归获取子元素  这个appendchild是该标签自带的方法，不是构造函数自己里面那个
          });
        } else if (nodeType === 3) {
          // 文本节点
          return document.createTextNode(vnode.value); // 创建文本节点
        }
        return _node;
      }
      // 在真正的vue中也是使用递归+栈
      let rdom = parseVnode(vapp);
      // 看前后是否一样
      console.log(rdom);
      app.parentNode.replaceChild(rdom, app);
    </script>
  </body>
</html>

```

但是上面显示的具体内容出现问题，我自己将代码再改了一下

```js
// 这是将真实Dom变成虚拟Dom的转换
if (nodeType === 1) {
          // 元素
          let nodename = node.nodeName;
          let attrs = node.attributes;
          let _attrObj = {};
         

          for (let i = 0; i < attrs.length; i++) {
            // attrs[i]属性节点(nodetype ==2)
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue;
          }

          _vnode = new Vnode(nodename, _attrObj, undefined, nodeType);

          // 还得考虑真正Dom元素的子元素
          let childNode = node.childNodes;
          for (let i = 0; i < childNode.length; i++) {
            _vnode.appendChild(getVnode(childNode[i])); // 递归
          }
        } else if (nodeType === 3) {
          _vnode = new Vnode(
            node.nodeName,
            undefined,
            node.nodeValue,   // 这里不再用undedined   就这里改了一下
            nodeType
          );
        }
        return _vnode;
      }
```

但是对于文本节点，视频后面都是这种操作，我用的是自己的，主要是看tag和value是不是我理解的意思：**自己先给自己挖坑，等填**

```js
else if (nodeType === 3) {
          _vnode = new Vnode(undefined, undefined, node.nodeName, nodeType);
        }
```



## 函数柯里化

跟函数编译有关，优化性能

1. 参考资料:

2. - [函数式编程](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)
   - [维基百科](https://zh.wikipedia.org/wiki/柯里化)

1. 概念:

2. 1. 科里化: 一个函数原本有多个参数, 只传入**一个**参数, 生成一个新函数, 由新函数接收剩下的参数来运行得到结构.
   2. 偏函数: 一个函数原本有多个参数, 只传入**一部分**参数, 生成一个新函数, 由新函数接收剩下的参数来运行得到结构.
   3. 高阶函数: 一个函数**参数是一个函数**, 该函数对参数这个函数进行加工, 得到一个函数, 这个加工用的函数就是高阶函数.

为什么要用柯里化

​	为了提升性能，使用柯里化可以缓存一部分能力。

两个例子：1：判断元素 2：虚拟Dom的render()方法。

1：判断元素

​	vue本质上是使用Dom的字符串作为模板，将字符串的模板转换为抽象语法树（AST），再转换为虚拟Dom（Vnode）。

-模板->AST

-AST ->Vnode

-Vnode->Dom     ：前面我们做的就是这个阶段的实现。

​	上面三个阶段哪一个最消耗性能。消耗性能的是不断的在页面的上增删改（更新一些东西）这种频繁的操作相对来说更消耗性能。因为浏览器需要不断刷新重绘。所有第三步在内存中直接操作反而相对来说不怎么消耗性能。	

​	上面模板转换为AST的时候是三步中最消耗性能，因为里面有一个字符串解析。

例子：

​	let s='1+2*(3+4)'

​	写一个程序，解析这个表达式，得到结果（一般化）

​	我们一般会将这个表达式转换为“波兰式”表达式，然后再用栈结构来运算。

在vue中每一个标签可以是真正的HTML标签，也可以是自定义组件。**怎么区分**

在 Vue 源码中其实将所有可以用的 HTML 标签已经存起来了



假设这里是考虑几个标签:

1. ```js
   let tags = 'div,p,a,img,ul,li'.split(',');
   ```

需要一个函数, 判断一个标签名是否为 内置的 标签

```js
function isHTMLTag( tagName ) {
  tagName = tagName.toLowerCase();
  if ( tags.indexOf( tagName ) > -1 ) return true;
  return false;
}
```

模板是任意编写的, 可以写的很简单, 也可以写到很复杂, indexOf 内部也是要循环的。

如果有 6 中内置标签, 而模板中有 10 个标签需要判断, 那么就需要执行 60 次循环

对上面代码优化一下

```js
let tags = 'div,p,a,img,ul,li'.split(',');
function makeup(tags ) {
   let set={};
   tags.forEach((key)=>{
       set[key]=true;
   });
   return function isexist(tagName){
      return !!set[tagName.toLowerCase()] ;
   }
  }
  
let make = makeup(tags);
console.log(make('div'));
```

虚拟 DOM 的 render 方法

> vue 模板转换为抽象语法树徐需要几次？？？

-页面一开始加载需要渲染，

-每一个属性（响应式）发生变换的时候需要渲染

-watcher，computed等等

`render`作用：

​	将虚拟Dom转换为真正的Dom`。

-虚拟Dom可以降级理解为抽象语法树。

-一个项目运行的时候模板是不会变的，也就是抽象语法树不会变。

转换的时候也只是数据变换，我们可以进行优化，我们可以将虚拟dom缓存起来，生成一个函数，函数只需要传入数据，就可以得到真正的dom。

虚拟Dom和真正的Dom是一个一一对应的关系。

<img src="/image-20210223150456056.png" alt="image-20210223150456056" style="zoom:80%;" />

<img src="/image-20210223151102622.png" alt="image-20210223151102622" style="zoom:80%;" />

<img src="/image-20210223151335558.png" alt="image-20210223151335558" style="zoom: 67%;" />



注意：如上图所示，我们真正的的HTML页面中的真Dom，背后有一个实实在在一一对应的虚拟Dom，也就是图中`VNode`，但是每一次数据变换都换产生一个`新VNode`，通过`diff算法`来比较`VNode`和`新VNode`的区别，相同忽略，不相同则更新`VNode`，从而真正的实现HTML页面更新。

> 所以抽象语法树到底是什么？？？代码中如何表示
>
> 就是上图中 的AST：好像是一直不变的。

为什么不用`新的VNode`和页面中真实的Dom直接比较替换？？？？

​	`虚拟Vnode`已经和真实Dom一一对应了，然后你让新VNode和真实Dom对比，又要一一映射关系。而且新VDom变成VNode进行update时还要进行一些比较（和优化）。新VDom变成VNode更新操作可以减少一些递归操作（也就是减少比较操作）。

## 讨论

1：闭包会内存泄漏

- 性能一定是会有问题
- 尽可能的提高性能

































## evan you讲源码

​	数据和模板生成DOM结构。

vue里面的$属的基本都是只读的，`_`开头的比如data是可读可写的。

里面show是我自己写在methods里面的函数。

![image-20210201112507425](/../图片/image-20210201112507425.png)

渲染：

模板+数据=》html=》加载到页面中。



效果：

​	页面的{{message}}的值替换为data里面的值

步骤：

将模板和数据结合，得到真正的DOM元素

将模板数据加到页面

真正的是生成一个虚拟DOM来判断是否渲染。



### 响应式

状态变更，不断更新页面的变换，在web场景下，将不断变换的状态反应到DOM上的变换。

拦截你的事件（如点击），检测所以属性，判断是否更改。

重写所有的getter和setter方法。

## Diff算法

![image-20210203162801648](/image-20210203162801648.png)

![image-20210203162754389](/image-20210203162754389.png)

![image-20210203162744745](/image-20210203162744745.png)

snabbdom是用Ts写的。

![image-20210203163242324](/image-20210203163242324.png)

`npm i -S snabbdom`  这是测试代码。