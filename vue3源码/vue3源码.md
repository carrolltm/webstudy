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







## 函数柯里化

跟函数编译有关，优化性能



## 虚拟DOM

将真正的DOM转换为虚拟DOM

将虚拟DOM转换为真正的DOM

虚拟DOM主要考虑到性能

标签，文本，属性

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