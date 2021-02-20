---
typora-root-url: images
---

# Node.js实战

## 实现个人的Http服务器

最简单版本：运行 node  HttpServe.js

```
// HttpServe.js
var http = require("http")

http.createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/blain"});
    res.write("Hello NodeJs");
    res.end();
}).listen(8888);

```

​		只要有请求过来，它就会激发回调函数function (req, res)，把“Hello World”写入到响应中返回去。这个事件模型跟浏览器中对onclick事件的监听类似。在浏览器中，点击事件随时都可能发生，所以要设置一个函数来执行对事件的处理逻辑，而Node在这里提供了一个可以随时响应请求的函数 。

​	![image-20210129090302324](/../图片/image-20210129090302324.png)

![image-20210129090344105](/../图片/image-20210129090344105.png)

### 流数据

​	你可以把数据流看成特殊的数组，只不过数组中的数据分散在空间上，而数据流中的数据是分散在时间上的。通过将数据一块一块地传送，开发人员可以每收到一块数据就开始处理，而不用等所有数据都到全了再做处理。  

​	**从文件流中读取数据**

```js
/**
 * 之前我们学习过读取文件内容的方法readFile（）；该方法适合读取文件内容比较少的文件，如果遇到数据量庞大的文件，我们要使用下面的方法
 */
const fs=require('fs');
//流读取文件是一块一块读取的
var readStream=fs.createReadStream("G:/files/dir1/test3.txt");
//每读取一块内容就会产生一个广播data，我们使用on来监听广播data，获取回调函数返回的数据,注意这里只能写成data，下面的其他广播名也一样
let  count=0;//声明一个变量用来验证读了多少次
var str='';//用来保存数据，把读取出的一块块数据都拼接到str
readStream.on("data",function (chunk) {
    str+=chunk;
    count++;
})
//读取完成会广播一个end事件
readStream.on("end",function (chunk) {
    console.log(str);
    console.log('一共读取了'+count+'次');
})
//读取出错会广播一个error的事件
readStream.on("error",function (err) {
    console.log(err);
})
```

​	**从文件流写入数据**

```js
/**
 * 写入流
 */
var writeStream=fs.createWriteStream("G:/files/dir1/test3.txt")
var  data='这是将要写入文件的内容';
writeStream.write(data,'UTF8')

//标记写入完成，注意标记写入完成之后就没办法继续写入了
writeStream.end();

//只要标记了写入完成就会广播一个finish事件,如果上面没有标记写入完成，就没法广播下面的finish事件
writeStream.on("finish",function () {
    console.log('写入完成');
})

//还有写入失败的广播error
writeStream.on("error",function () {
    console.log('写入失败');
})
```

**读取一个文件内容写入另外一个文件里面**

```js
/**
 * 管道流
 */
//创建一个读取流
var  readStream=fs.createReadStream("G:/files/dir1/test3.txt");
//创建一个写入流
var  writeStream=fs.createWriteStream("G:/files/dir2/test1.txt");
//读取流的内容通过管道流写入到输出流
readStream.pipe(writeStream);
```

