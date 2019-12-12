# Promise对象

## Promise含义

- Promise时异步编程的一种解决方式,比传统的解决方案 `回调函数和事件`更合理更强大,它由社区最早提出和实现,ES6将其写进了语言标准,统一了用法,原生提供了`Promise`对象
- 所谓Promise,简单说就是一个容器,里面保存着某个未来才会结束的事件`(通常是一个异步操作的结果)`,从语法上看,Promise是一个对象,从他可以获取到异步操作的消息,Promise提供统一的API,各种异步操作都可以用到同样的方法进行处理.

### Promise对象的两个特点

- `1`
  - 对象的状态不受外界影响,Promise对象代表一个异步操作,有三种状态,`pending(进行中)`,`fulfilled(已成功)`,`rejected(失败)`,只有异步操作的结果,可以界定当前是哪一种状态,任何其他操作都无法改变这个状态,这也是Promise这个名字的由来,他的英语意思标识`承诺`,标识其他手段无法改变.


- `2`
  - 一旦改变状态,就不会再改变,任何时候都可以得到这个结果,Promise对象的状态改变,只有两种可能:`从pending`变为`fulfilled(成功)`和从`pending`变为`rejected(失败)`,只要这两种情况发生,状态就固定了,这是就称为`resolved(已定型)`


## 基本用法

- ES6固定,Promise对象是一个构造函数,用来生成`Promise实例`
- Promise构造函数需要接收一个函数作为参数,这个参数可以成为执行器函数,该函数是同步的,该函数中需要指定两个参数,resolve和reject,这两个参数是函数,由JavaScript引擎提供,不需要自己部署
  - `执行器函数的参数`
    - `resolve`
      - 该函数的作用是,将Promise对象的状态从`未完成`变为`成功`(pending > resolved)
      - 在异步操作成功时被调用,将将异步操作的结果,作为`参数`传递出去
    - `reject`
      - 该函数的作用是:将Promise对象的状态从`未完成变为失败`(pending > rejected),`在异步操作失败时调用`,并将异步操作报出的错误作为参数传递出去
    - `resolve和reject总结`
      - resolve是成功的回调,并将结果作为参数传递出去以及将Promise状态改为成功`(pending > resolved)`
      - reject是失败的回调,将报的错误作为参数传递出去以及将Promise状态改为失败`(pending > rejected)`

- `demo`

```js
let p = new Promise((resolve,reject) => {
    if(){
      resolve(value)  
    }else{
        reject(error)
    }
异步操作后不管是调用成功的回调还是失败的回调 `Promise的状态都会对应发生改变(resolved || rejected)`
})          
```

### then方法

- `适用场景`
  - 该方法是Promise构造函数原型上的方法,意味着该方法是为Promise实例出来的对象而服务的
- `特点`
  - then()方法可以接受两个回调函数作为参数,第一个回调函数是`Promise`对象的状态变为`resolved`时调用,第二个参数时`Promise`对象的状态变为`rejected`时调用,其中第二个参数是可选的,不一定要提供,因为后期有`cath`方法
  - `这两个函数都接受`Promise`对象传出的值作为参数`
- `then方法可以分别指定resolved和rejected` 即成功和失败
- 要点:`当Promise的状态变为resolved || rejected 会分别调用then的两个回调函数 Promise状态为成功时(resolved)调用第一个,状态为失败时(rejected)调用第二个`

- `demo`
  
```js
        let p = new Promise((resolve,reject) => {
            let a = 123;
            if(a % 2 == 0) resolve();
            else{
                reject(false);  //无数据
            }
        });

        p.then(
            value => console.log(value),
            error => console.log(error)   //undefined
        ).then(
            value => console.log(value),  //undefined   value === true
            error => console.log(error)
        )
        // 查看Promise状态
        console.log(p);    //Promise {<rejected>: undefined} 
验证:
    1.Promise会根据情况调用resolve || reject
    2.resolve || reject 会分别将Promise的状态改为 `(resolved || rejected)`
    3.then是有返回值的(返回另一个Promise实例),then里面的两个函数也是分别有返回值的(会根据上一次的返回来决定执行成功还是失败.返回值详情请阅读下方),
    4.then方法可以分别指定resolved和rejected状态的回调函数
```


#### 小结

```js
        let p = new Promise((resolve,reject) => {    //p status === pending
            
            setTimeout(() => {

                if(p.PromiseStatus === 'pending') resolve('成功');     //拿不到他的Promise状态
                
                let num = Math.random() * 10;      //另辟捷径
                if(num > 5){
                    resolve('成功');
                    console.log(p);    //Promise {<resolved>: "成功"} 状态为成功 立即调用then的第一个回调函数 并将value作为参数传递出去
                }
                else{
                    reject('失败');
                    console.log(p);
                }
            },2000);

        });

        // then方法中的两个回调是由Promise的状态来决定调用哪一个 而Promise的状态是由Promise的参数(执行器函数中的两个JavaScript引擎提供的两个函数)来决定的 
        p.then(
            value => console.log(value),   // Promise状态为 resolved时 调用该回调 该函数value形参接收到 resolve('成功') 成功时的回调
            error => console.log(error) 
        )
```