---
typora-root-url: 图片
typora-copy-images-to: 图片
---

# vue学习

[参考](https://www.runoob.com/vue2/vue-directory-structure.html)

## 起步

#### vue创建

​		当一个 Vue 实例被创建时，它向 Vue 的**响应式系统**中加入了其 data 对象中能找到的所有的属性。当这些属性的值发生改变时，html 视图将也会产生相应的变化。

##### 属性

b包含数据属性和实例属性（$)

#### 模板语法

##### 插值

文本插值 直接{{}}

html插值 v-htem=""

属性:HTML 属性中的值应使用 v-bind 指令。

##### v-on  vs v-bind  的区别

v-bind绑定的是属性：样式，超链接什么的

v-on绑定的是事件：

##### v-bind vs v-model 的区别

v-bind:是单向的，即是data里面的数据变化，在标签里面绑定的值相应变化

v-model:只有v-model才能实现双向数据绑定。注意：-model后面不需要跟冒号。

**注意**：v-model 只能运用在**表单元素**中，或者用于自定义组件。常见的表单元素包括：input(radio, text, address, email....) 、select、checkbox 、textarea。

##### v-for

​	在 Vue 2.2.0+ 版本里，当在**组件中**使用 v-for 时，key 属性是必须要加上的。

```js
<form action="#">
    	<!-- 将 input 标签中的value值双向绑定到 Vue实例中的data。注意，v-model 后面不需要跟冒号 -->
        <input type="text" id="username" v-model="myAccount.username">
        <input type="password" id="pwd" v-model="myAccount.userpwd">

        <input type="submit" v-on:click="submit1" value="注册">

    </form>
```

##### v-if

可以用来设置设置元素的显示和隐藏,添加/删除Dom元素

根据表达式的值的真假条件，来决定是否渲染元素，如果为false则不渲染（达到隐藏元素的目的），如果为true则渲染。

在切换时，元素和它的数据绑定会被销毁并重建。

```js
<body>
  <div id="app">
    <button v-on:click="toggle">显示/隐藏</button>
    <div v-if="isShow">我是盒子</div>
  </div>
</body>

<script>
  new Vue({
    el: '#app',
    data: {
      isShow: true
    },
    methods: {
      toggle: function() {
        this.isShow = !this.isShow;
      }
    }
  });
</script>

```

##### v-show

设置元素的显示和隐藏，在元素上添加/移除 

根据表达式的真假条件，来切换元素的 display 属性。如果为false，则在元素上添加 `display:none`属性；否则移除`display:none`属性。

```js

<body>
  <div id="app">
    <button v-on:click="toggle">显示/隐藏</button>
    <div v-show="isShow">我是盒子</div>
  </div>
</body>

<script>
  new Vue({
    el: '#app',
    data: {
      isShow: true
    },
    methods: {
      toggle: function() {
        this.isShow = !this.isShow;
      }
    }
  });
</script>
```

V-if   和V-show的区别

区别：

- v-if：每次都会重新添加/删除DOM元素
- v-show：每次不会重新进行DOM的添加/删除操作，只是在这个元素上添加/移除`style="display:none"`属性，表示节点的显示和隐藏。

优缺点：

- v-if：有较高的切换性能消耗。这个很好理解，毕竟每次都要进行dom的添加／删除操作。
- v-show：**有较高的初始渲染消耗**。也就是说，即使一开始`v-show="false"`，该节点也会被创建，只是隐藏起来了。而`v-if="false"`的节点，根本就不会被创建。

**总结**：

- 如果元素涉及到频繁的切换，最好不要使用 v-if, 而是推荐使用 v-show
- 如果元素可能永远也不会被显示出来被用户看到，则推荐使用 v-if



#### 过滤器

Vue.js 允许我们自定义过滤器，可被用作一些常见的文本格式化。过滤器可以用在两个地方：mustache **插值表达式**、 **v-bind表达式**，过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符指示。

系统过滤器在vue2.0时候已经删除

##### 全局过滤器

全局方法`Vue.filter()`这样的话，每一个Vue的对象实例（每一个VM实例）都可以拿到这个过滤器。它接收两个参数：过滤器的名称 、过滤器函数。

```js
<div id="app">
        <!-- 通过 过滤器 msgFormat 对 msg 进行过滤-->
        <p>{{ msg | msgFormat }}</p>
</div>
 
<script>
        // 定义一个 Vue 全局的过滤器，名字叫做  msgFormat
        Vue.filter('msgFormat', function (myMsg) {
            // 字符串的  replace 方法，第一个参数，除了可写一个 字符串之外，还可以定义一个正则
            //将 myMsg 中的所有`单纯`字样，修改为`邪恶`
            return myMsg.replace(/单纯/g, '邪恶')
        })

        // 创建 Vue 实例，得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: {
                msg: '曾经，我也是一个单纯的少年，单纯的我，傻傻的问，谁是世界上最单纯的男人'
            },
            methods: {}
        });
    </script>js
```

过滤器可以有多个参数或者直接多个过滤器

##### 私有过滤器（类似于局部过滤器）

在某一个 vue 对象内部定义的过滤器称之为私有过滤器。这种过滤器只有在当前vue对象的el指定的监管区域有用。

```js
<body>
    <div id="app">
        {{ time }}
        <br />
        {{ time | datefmt }}
    </div>

</body>
<script>

    new Vue({
        el: '#app',
        data: {
            time: new Date()
        },
        //在某一个vue对象内部定义的过滤器称之为私有过滤器，
        //这种过滤器只有在当前vue对象el指定的监管的区域有用
        filters: {
            // input是自定义过滤器的默认参数，input的值永远都是取自于 | 左边的内容
            datefmt: function (input) {
                // 定义过滤器的内容：将input的值格式化成 yyyy-MM-dd 字符串输出
                var res = '';
                var year = input.getFullYear();
                var month = input.getMonth() + 1;
                var day = input.getDate();

                res = year + '-' + month + '-' + day;

                return res;
            }
        }
    });
</script>
```

### 生命周期函数

[非常好](https://github.com/qianguyihao/Web/blob/master/11-Vue%E5%9F%BA%E7%A1%80/02-Vue%E5%AE%9E%E4%BE%8B%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%87%BD%E6%95%B0.md)

#### 主要分类

##### 初始化时依次触发：刚创建时

- beforecreate

   这时候实例刚在内存中创建，data和methods还没属性还没初始化

- create：实例在内存中创建OK，且此时data和methods也已经创建和初始化OK，但此时还没开始编译模板。**我们可以在这里进行Ajax请求。**

- beforeMount：此时已经完成了模板的编译，但是还没有挂载到页面中

- mounted：此时，已经将编译好的模板，挂载到页面指定的容器中显示（mouted之后表示真是DOM渲染完了，可以操作DOM了）

##### 	 运行时期的生命周期函数：页面元素更新时候触发

- beforeUpdate 状态更新之前执行此函数，此时data的状态值是最新的，但是界面上显示的数据还是旧的，因为此时还没有重新渲染DOM节点。

- updated：实例更新完毕之后调用此函数，此时data中的状态值和界面上显示的数据，都已经完成了更新，界面已经被重新渲染好。

  注意：数据发生变化时，会触发这两个方法，不过，**我们一般都是用watch来做**

##### 销毁期间的生命周期函数

- beforeDestroy：实例销毁之前调用。在这之前，实例仍然完全可用。
- destroyed：vue实例销毁之后调用。调用后，Vue实例指示的所以东西都会解绑定，所有的事件监听器都会被移除，所有的子实例也会被销毁。

PS：可以在beforeDestory里清除定时器，或清除事件绑定。

### 数据请求

#### Ajax请求

##### V-resource介绍

`vue-resource`是Vue高度集成的第三方包.

vue-resource 依赖于 Vue。所以，我们要按照先后顺序，导入vue.js和vue-resource.js文件。

`vue.js`文件向Windows对象暴露了`Vue`这个关键词；`vue-resource.js`向Vue身上挂载了`this.$http`这个属性。于是，我们可以直接写`this.$http.get`或者`this.$http.post`或者`this.$http.jsonp`来调用

##### JSONP的实现原理：

使用v-resourse中的jsonp命令。

**但是：**由于浏览器的安全性限制，默认不允许Ajax发起跨域（协议不同、域名不同、端口号不同）的请求。浏览器认为这种访问不安全。

**JSONP的实现原理**：通过**动态创建script标签**的形式，用script标签的src属性，代表api接口的url，因为script标签不存在跨域限制，这种数据获取方式，称作JSONP（注意：根据JSONP的实现原理，知晓，JSONP只支持Get请求）。

具体实现过程：

- 先在客户端定义一个回调方法，预定义对数据的操作
- 再把这个回调方法的名称，通过URL传参的形式，提交到服务器的api接口；
- 服务器api接口组织好要发送给客户端的数据，再拿着客户端传递过来的回调方法名称，拼接出一个调用这个方法的字符串，发送给客户端去解析执行；
- 客户端拿到服务器返回的字符串之后，当作Script脚本去解析执行，这样就能够拿到JSONP的数据了

#### axios请求

这是第三方包来实现数据的请求

##### 通过Vue全局配置api接口的URL地址

api接口的url地址包括：绝对地址+相对地址

我们在做Ajax请求的时候，所填写的url建议填相对路径，把绝对路径部分放在全局位置

```js
 // 通过 post 方法的第三个参数{ emulateJSON: true } ，来设置 提交的内容类型 为 普通表单数据格式
```

```js
 <script>
    // 如果我们通过全局配置了，请求的数据接口 根域名，则 ，在每次单独发起 http 请求的时候，请求的 url 路径，应该以相对路径开头，前面不能带 /  ，否则 不会启用根路径做拼接；
    Vue.http.options.root = 'http://smyhvae/';
    // 全局启用 emulateJSON 选项
    Vue.http.options.emulateJSON = true;

    var vm = new Vue({
      el: '#app',
      data: {
        name: '',
        list: [ // 存放所有品牌列表的数组
        ]
      },
      created() { // 当 vm 实例 的 data 和 methods 初始化完毕后，vm实例会自动执行created 这个生命周期函数
        this.getAllList()
      },
      methods: {
        getAllList() { // 获取所有的品牌列表
          // 分析：
          // 1. 由于已经导入了 Vue-resource这个包，所以 ，可以直接通过  this.$http 来发起数据请求
          // 2. 根据接口API文档，知道，获取列表的时候，应该发起一个 get 请求
          // 3. this.$http.get('url').then(function(result){})
          // 4. 当通过 then 指定回调函数之后，在回调函数中，可以拿到数据服务器返回的 result
          // 5. 先判断 result.status 是否等于0，如果等于0，就成功了，可以 把 result.message 赋值给 this.list ; 如果不等于0，可以弹框提醒，获取数据失败！

          this.$http.get('api/getprodlist').then(result => {
            // 注意： 通过 $http 获取到的数据，都在 result.body 中放着
            var result = result.body
            if (result.status === 0) {
              // 成功了
              this.list = result.message
            } else {
              // 失败了
              alert('获取数据失败！')
            }
          })
        }
      }
    });
  </script>
```

[axios理解](https://www.bilibili.com/video/BV15741177Eh?p=142)

##### 选择什么样的网络模块

**传统的Ajax**

  基于XMLHttpRequest（XHR）

- ​    配置和调用方式比较混乱
- ​	编码难受

**jQuery-Ajax**

![image-20210109140140498](/image-20210109140140498.png)

**Vue-resource**

![image-20210109140258449](/image-20210109140258449.png)

**为什么选择Axios**

![image-20210109140523599](/image-20210109140523599.png)

#### 组件的定义和注册

##### 组件

组件的出现，就是为了拆分Vue实例的代码量的，能够让我们以不同的组件，来划分不同的功能模块，将来我们需要什么样的功能，就可以去调用对应的组件即可。

##### 组件化和模块化的区别

- 模块化：是从代码逻辑的角度进行划分的；方便代码分层开发，保证每个功能模块的职能单一
- 组件化：是从UI界面的角度进行划分的；前端的组件化，方便UI组件的重用

##### 定义和注册

Component组件可以扩展HTML元素，封装可重用代码

template里面一定需要一个大的根元素（例如div）包裹起来

##### 组件的data必须是一个function

#### 父组件向子组件传值 

Vue实例就是一个**父组件**，而我们自定义的组件（包括全局组件、私有组件）就是**子组件**。

【重点】需要注意的是，子组件不能直接使用父组件中的数据。**父组件可以通过`props`属性向子组件传值**。

类似于父组件在组件使用的组件名中标识，子组件中的props对于名称标识，这样子的话父组件的值就能传递到子组件。

![image-20210109160934547](/image-20210109160934547.png)

##### **父组件给子组件传值的步骤**：

> 根据上方截图，我们可以总结出父组件给子组件传值的步骤如下。

（1）在子组件的`props`属性中声明父亲传递过来的数据

（2）定义子组件的模板时，使用props中的属性

（3）父组件在引用子组件时，进行属性绑定。

##### **子组件中，data中的数据和props中的数据的区别**：

- 子组件中的 data 数据，并不是通过 父组件传递过来的，而是子组件自身私有的，比如： 子组件通过 Ajax ，请求回来的数据，都可以放到 data 身上。props 中的数据，都是通过 父组件 传递给子组件的。
- data中的数据是可读可写的；props中的**属性只是可读的，无法重新赋值，重新赋值会报错**（也就是说，子组件不要直接去修改父组件中的数据）。

##### 父组件将方法传递给子组件

父组件通过事件绑定机制，将父组件的方法传递给子组件

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="vue2.5.16.js"></script>
</head>

<body>
    <div id="app">
        <!-- 父组件向子组件 传递 方法，是通过 事件绑定机制； v-on。当我们自定义了 一个 事件属性 parent-show（这个地方不能用驼峰命名）之后，-->
        <!-- 那么，子组件就能够，通过 emit 来调用 传递进去的 这个 方法了 -->
        <!-- 【第一步】。意思是说，`show`是父组件的方法名，`parent-show`是自定义的时间属性，稍后要在子组件中用到 -->
        <component1 @parent-show='show'></component1>
    </div>

    <!-- 定义子组件的模板 -->
    <template id="myTemplate">
        <!-- 【第二步】按照正常的写法来：点击按钮，调用子组件的方法 -->
        <div @click="childClick">我是子组件，点击调用父组件的方法</div>
    </template>

    <script>
        // 创建 Vue 实例，得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: { //父组件的data
                // msg: '父组件中的数据'
            },
            methods: {
                show: function () { // 定义父组件的show方法
                    console.log('父组件提供的方法');
                }
            },
            components: {
                component1: { //将子组件的名称定义为 component1
                    template: '#myTemplate',
                    data() { // 子组件的data
                        return {
                            // content: '子组件私有的数据 content'
                        }
                    },
                    props: [''],
                    directives: {},
                    filters: {},
                    components: {},
                    methods: {
                        childClick() {
                            // 当点击子组件的按钮时，如何 拿到 父组件传递过来的 func 方法，并调用这个方法？？？
                            //  emit 英文原意： 是触发，调用、发射。意思是，触发父组件的方法
                            // 【第三步】 在子组件的方法中，通过 emit 触发父组件的方法
                            this.$emit('parent-show');
                        }
                    }
                }
            }
        });
    </script>
</body>

</html>
```

this.**$emi**t('parent-show'); 通过在子组件中调用该种方法，

#### 子组件向父组件传值

如果要实现**子组件向父组件传值**，代码是类似的，我们**只需要在子组件通过`emit`触发父组件的方法**时，把子组件的参数带出去就可以了。代码如下。

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="vue2.5.16.js"></script>
</head>

<body>
    <div id="app">
        <component1 @parent-show='show'></component1>
    </div>

    <!-- 定义子组件的模板 -->
    <template id="myTemplate">
        <h2 @click="childClick">我是子组件，点击调用父组件的方法</h2>
    </template>

    <script>
        // 创建 Vue 实例，得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: { //父组件的data
                parentData: null
            },
            methods: { // 定义父组件的方法
                show: function (arg) { //【第二步】父组件里放参数，这个参数就代表着子组件中的 child.data
                    console.log('父组件提供的方法');
                    this.parentData = arg; //将参数arg传递给父组件的data，也就达到了目的：子组件传递数据，赋值给父组件
                    console.log('打印父组件的数据（这是子组件传过来的）：'+ JSON.stringify(this.parentData));
                }
            },
            components: {
                component1: { //将子组件的名称定义为 component1
                    template: '#myTemplate',
                    data() { // 子组件的data
                        return {
                            childData: { //定义自组件的数据
                                name: 'smyhvae',
                                age: 26
                            }
                        }
                    },
                    props: [''],
                    directives: {},
                    filters: {},
                    components: {},
                    methods: {
                        childClick() {
                            // 子组件如果要给父组件传递参数，在触发 emit 的时候，通过参数的形式带出去就可以了
                            // 【第一步】在子组件里，通过传参的形式，把子组件的data，传给父组件
                            this.$emit('parent-show', this.childData);
                        }
                    }
                }
            }
        });
    </script>
</body>

</html>
```

#### 通过 ref 属性获取DOM元素

[vue中ref的三种用法](https://www.cnblogs.com/goloving/p/9404099.html)

还有一个children也可以，但是是类似于数组比较固定。

在Vue框架中并不推荐JS原生的做法（document.getElementById）或者 jQuery 来获取DOM，但是这种做法却在无形中操作了DOM

**在Vue中，通过 ref 属性获取DOM元素**的步骤：

（1）第一步：在标签中给 DOM 元素设置 ref 属性。

```js
    <h3 id="myH3" ref="myTitle"> 今天天气太好了</h3>
```

（2）第二步：通过 this.this.$refs.xxx 获取 DOM 元素

```js
console.log(this.$refs.myTitle.innerText)
```

#####  ref 属性获取整个子组件（父组件调用子组件的方法）

只要`ref`属性加在了DOM元素身上，我们就可以获取这个DOM元素。

那我们可以通过ref属性获取整个**Vue子组件**吗？当然可以。这样做的意义是：**在父组件中通过`ref`属性拿到了子组件之后，就可以进一步拿到子组件中的data和method。

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="vue2.5.16.js"></script>
</head>

<body>
    <div id="app">

        <input type="button" value="点击按钮" @click="getElement">

        <login-component ref="loginTemplate"></login-component>
    </div>

    <script>

        // 创建 Vue 实例，得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: {},
            methods: {
                getElement() {

                    //在父组件中，通过ref获取整个子组件，进而获取子组件的data
                    console.log(this.$refs.loginTemplate.myData)

                    //在父组件中，通过ref获取整个子组件，进而获取子组件的method
                    this.$refs.loginTemplate.showMethod()
                }
            },
            components: {
                'login-component': {
                    template: '<h1>登录组件</h1>',
                    data() {
                        return {
                            myData: '子组件的data'
                        }
                    },
                    methods: {
                        showMethod() {
                            console.log('调用子组件的method')
                        }
                    }
                }
            }
        });
    </script>
</body>

</html>
```

#### 路由

##### 后端路由

把所有的URL都对应到服务器的资源，这个对应关系就是路由

##### 前端路由

**单页面程序：**

- 主要通过URL中的hash（**url地址中的#号**）来实现不同页面的切换
- hash有一个特点：HTTP请求中不会包含hash相关的内容。所以，单页面程序中的页面跳转主要用hash实现。

通过hash改变来切换页面的方式，称作前端路由。

注意，只要我们导入了`vue-router.js`这个包，在浏览器中打开网页时，url后面就会显示`#`这个符号。

我们就可以在 window全局对象中使用 VueRouter这个对象。具体解释可以看接下来的代码中的注释。

### Vuex组件

- 简单的将其看成把需要多个组件共享的变量全部存储在一个对象里面。

- 然后，将这个对象放在顶层的Vue实例中，让其他组件可以使用。

- **更重要的是保证里面的对象做到响应式**，Vuex就是为了提供这样一个在多个组件间共享状态的插件

  **就是类似于一个公共的变量，做到响应式**，适用于多个界面都需要的状态。

实现方法一

![image-20210121164306227](/image-20210121164306227.png)

这类似于ES5中放到**原型**中导致所有实例都可以共享，但是无法做到响应式。

#### 使用

```js
一般放在store文件中     store---仓库
// index.js
import Vue from 'vue';
import Vuex from 'vuex';
// 1：安装插件
Vue.use(Vuex);
// 2：创建对象
const store =  new Vuex.Store({
  // 一些想要的参数  下面这几个参数都是固定的，（名称也是固定额度）
  // 下面都是{}对象格式
  // 自定义对象，保存着一些固定参数
  state:{
      counter:100;
  },   
  // 一些自定义方法  比如incremet(state) 函数名自取，但默认（自动）都有一个state参数   
  //而且state就是前面的state
  mutations：{
    	increase(state){
    		state.count++;
		}
},  
 // 里面也是函数，比如计算平方
  getters,
  actions,
  modules: {
    query: QueryModule,
    history: HistoryModule,
  }
});
// 导出
export default store;

在main.js中
import store from "./store";
 new Vue({
  store,  // 这是挂载了vuex
  render: (h) => h(App),
}).$mount("#app");

// 类似于：  vue.prototype.$store = store
```

```js
// 使用方法
比如插槽
{{$store.state.值}}
// 变换store里面的值
$store.state.值++; 但是不建议这样改

```

```js
// 调用
this.$store.commit('increase');  // 通过commit进行提交

所以
通过 this.$store.state.属性的方式来访问状态
通过 this,$store.commit("mutation中方法")来修改状态
```

![image-20210121192627345](/image-20210121192627345.png)

#### 改变值

改变需要按固定的格式改

![image-20210121190016817](/image-20210121190016817.png)

Devtools是浏览器上面的插件。

多个人改不好跟踪，vue使用devtools跟踪每一个改变的状态。

actions是说明有**异步**操作可以在actions中来做。

#### 核心概念

```js
  state,   
  mutations,	
  getters,
  actions,
  modules: {
    query: QueryModule,
    history: HistoryModule,
  }
```

getters:类似于组件里面的计算属性

Action：专门一些异步操作

module:划分模块

##### state单一状态树

- 如果你的状态信息是保存到多个Store对象中的，那么之后的管理和维护等等都会变得特别困难。
- 所以Vuex也使用了单一状态树来管理应用层级的全部状态。
- 单一状态树能够让我们最直接的方式找到某个状态的片段，而且在之后的维护和调试过程中，也可以非常方便的管理和维护。

**意思就是推荐只使用一个store。**

##### getters基本使用

​	对于state中的数据需要经过一系列变化。

![image-20210121194458500](/image-20210121194458500.png)

![image-20210121194509383](/image-20210121194509383.png)

![image-20210121194532118](/image-20210121194532118.png)

还可以有第二个参数，可以直接调用本身getters。

![image-20210121195725442](/image-20210121195725442.png)

getters默认是不能传递参数的, 如果希望传递参数, 那么只能让getters本身返回另一个函数.全是第一个参数就是默认state的值，第二个参数默认是getters的值。

比如上面的案例中,我们希望根据ID获取用户的信息。

​	可以返回成一个函数。来实现传递参数。

![image-20210121200038828](/image-20210121200038828.png)

##### Mutation状态更新

 vuex的sytore状态更新唯一方式：**提交**Mutation

意思是getters无法改变state里面的值。

Mutation主要包括两部分：

- 字符串的事件类型（type）
- 一个回调函数（handler）,该回调函数的第一个参数就是state。

Mutation第二个可以直接是参数

```js
  mutations：{
    	increase(state){
    		state.count++;
		},
         decrease(state,count){
             statecounter +=count;
         }
}
```

通过mutation更新，在vue中

![image-20210122082936616](/image-20210122082936616.png)

![image-20210122082955192](/image-20210122082955192.png)

![image-20210122083228618](/image-20210122083228618.png)

这时候传回的就是一个对象。

![image-20210122084056434](/image-20210122084056434.png)

为了将属性先加入响应式存储中，这样后面就会监听变化。

如果属性里面没有address，你后面增加了adrss的值，一般来说，这种就没反应。

```js
// 这个意思就是将这个info中的address属性加入响应式。
vue.set(state.info,'address','洛杉矶');
// 这样子才能做到响应式（本身属性没有在sate中定义初始化的那种)
vue.delete(sate.info,'adress');
```

mutation中必须是同步操作，异步操作放到action中使用。

##### Actions

context上下文

![image-20210122091001616](/image-20210122091001616.png)

![image-20210122091707373](/image-20210122091707373.png)

![image-20210122092150283](/image-20210122092150283.png)

![image-20210122092720406](/image-20210122092720406.png)

### wbpack

