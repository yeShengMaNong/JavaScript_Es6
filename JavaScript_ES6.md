# let

- Es6 新增了`let`命令,用来声明变量,他的用法和`var`类似,但是所声明的变量,只在 let 命令所在的`代码块中有效`.
- 以下实例为了方便编写直接使用要测试变量代替 console.log();
- `实例`

```js
{
    let a = 1;
    var b = 1;
    a 1
}
a  报错
b  1

for(let i = 0; i < 5; i++){
    ...
};
a //报错
```

- `循环场景`
  - 循环是使用`var`在循环完毕时,会将变量泄露成全局变量,比较鸡肋

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  };
}
console.log(a);
a[1](); //10
/* 
        代码解析
            1. 外部使用定义了一个a数组默认为空
            2. 循环中的变量使用 var 定义 在循环的时候分别在a数组中存了10个函数 函数体分别输出i
            3. 在函数外部调用a数组中的某一个函数 结果为10
         */

let b = [];
for (let i = 0; i < 10; i++) {
  b[i] = function() {
    console.log(i);
  };
}
console.log(b);
b[7](); //7
```

### let 特点

- let 不存在变量提升,凡是在声明前使用都报错
- let 有自己独立的块级作用域
- let 只在自己的块级作用域中存在,外部访问不到
- let 不允许重复声明
- let 不能在函数内部重新声明参数

<hr

# 块级作用域

- `为什么要有块级作用域`

  - Es5 只有全局作用域和函数作用域,没有块级作用域,这带来很多不合理的场景.
  - 第一种场景,内层变量可能会覆盖外层变量
  - 第二种场景,变量在循环完毕用来计数的变量泄露为全局变量

  ```js
  var tmp = new Date();
  function demo() {
    console.log(tmp);
    if (false) {
      var tmp = `hello world`; //tmp以及提升
    }
  }
  demo(); //undefined

  var str = "hello";
  for (var i = 0; i < str.length; i++) {
    console.log(str[i]);
  }
  console.log(i); //计算的变量已成为全局变量
  ```

- 通过以上两个例子想必已经体会到了`var`和没有块级作用域的痛点

## Es6 块级作用域

- Es6 推出了块级作用域 即一个{}为一个作用域,`作用域是独立的,多个作用域之间是无法读取到的,这让我们的变量数据更加安全和准确`
- 在不同的作用域中我们可以定义同一个变量名
- `let`实际上为 JavaScript 新增了块级作用域

- `让我们看一个实例`

```js
function demo1() {
  let a = 123;
  {
    let a = 456;
  }
  console.log(a); //123
}
demo1();

该实例有两个代码块,都声明了变量a 当函数调用时,结果为123 即说明块级作用域是独立的
```

- `带来的好处`
  - 在没有块级作用域之前,我们为了让变量不受到污染,则采用`IIFE(匿名立即执行函数表达式)`,而现在我们不需要了.
- `实例展现`

```js
(function(){
 var tmp = ...;
}());

{
    let tmp = 123;
}

{
    let tmp = 456;
}
```

## 快级作用与函数声明

- `Es5`

  - 函数能不能在块级作用域中声明,这是一个混淆的问题
  - Es5 规定,函数只能在顶层作用域和函数作用域中声明,不能在块级作用域中声明.

- `Es6`
  - Es6 引入了块级作用域,明确允许在块级作用域之中声明函数,Es6 规定,块级作用域之中,函数声明语法的行为类似于`let`,在块级作用域之外不可引用

<hr>

# const

- `const`用来声明一个`只读`的常量,一旦声明,常量的值就不能改变.
- const 声明的变量不得改变值,这样意味这,`const`一旦声明变量,就必须立即初始化,不能留到以后赋值.对
- 于 const 来说,只声明不复制就报错.

- `实例`

```js
const a = 213;
a = 456;    //报错
console.log(a);

const b;   报错
```

## const 的作用域

- const 的作用域和 let 一致,只在声明所在的块级作用域中有效
- conts 声明的变量不存在变量提升
- const 声明的的变量必须立即初始化
- const 不可重复声明变量

# Es6-变量解构赋值

- Es6 允许按照一定的方式,从数组和对象中提取值,对变量进行赋值,这被称为解构.
- Es6 之前,为变量赋值,我们只能直接指定值.

```js
var a = 1;
var b = 2;
var c = 3;
```

- `Es6允许写成下面这样的`

```js
let [a, b, c] = [1, 2, 3];
本质上, 这中写法被称为模式匹配;
```

# 箭头函数

- es6 新增了一条新的函数,Arrow Function(简称箭头函数)
- 为什么叫箭头函数呢?因为他的定义用的就是一个箭头
- 箭头函数多用来定义回调

```js
x => x * y
    \/
function (x){
    return x * y;
}
    \/

let fn = x => x * x  ===  x => x * x   ===  (x) => {x * x};
解析
1. => 右边的表达式相当于普通函数体内容的代码
2. => 左边的相当于普通函数的形参
```

## 特点

- 箭头函数相当于匿名函数,并且简化了`函数定义`,箭头函数有`两种格式`,一种就是上面的代码,只包含一个表达式,连`{xxx}`和`return`都省略掉了.
- 还有一种可以包含多条语句,这时候就不能省略`{xxxx}`和`return`.

- `实例`

```js
x => {
  if (x > 0) return x * x;
  else {
    return -x * x;
  }
};
```

- 如果参数不是一个,就需要用`()`包起来

- `实例`

```js
(x,y) => x * x + y * y;
- 不加{}默认是该条表达式的值
```

- 如果没有参数并且函数体只有一条语句则需要使用如下写法
  - `() 和 {}都可以省略`
- `实例`

```js
() => console.log(1 + 2);
```

- 如果箭头函数没有参数,则函数体有多条语句就需要使用`{}`将函数体内容包起来
  - 如果使用了{}默认返回值为 return 的结果,`如果没有{}则是该函数体当前语句的结果`
- `实例`

```js
() => {
  let a = 100;
  let b = 200;
};
-该函数返回值为undefined;
```

### 避免雷区

- 如果要返回一个对象,就要注意,如果是单表达式,可能会报错,因为和函数体的`{xxx}`有语法冲突
- `实例`

```js
x => {name:'zly'}     SyntaxError

- 正确写法

x => {{name:'zly'}}   true {name:'zly'} === return后的值
```

### 箭头函数的返回值

- 箭头函数的返回值是根据有{}来判定的,如果有`{}`则就是 return 的返回值,如果没有就是函数体语句的结果

- `通过实例验证`

```js
let a = "测试箭头函数不带{}是不是该字符串";
let test = () => str;
let result = test();
console.log(result); // 测试箭头函数不带{}是否是该字符串    true

let test = () => {};
let result = test();
console.log(result); //undefined
```

### 箭头函数的 this

- `箭头函数的this对象,就是定义时所在的对象而不是使用时所在的对象`箭头函数的 this 指向是固定的
- 不可以当作构造函数去使用,也就是说,不可以使用`new`命令,否则会抛出一个错误
- 不可以使用`arguments`对象,该对象在函数体内不存在
- 箭头函数看上去是匿名函数的一种简写,但实际上,箭头函数和匿名函数有个明显的区别:`箭头函数内部的this是词法作用域,由上下文决定`
- 简单记忆法,箭头函数的 this 看他外曾是否有函数,如果有箭头函数的 this 就是该函数的 this,如果没有箭头函数的 this 指向 window

### 箭头函数写法总结

- 1.如果没有参数 并且只有一条函数体内容 `则需要用() 不需要用{} 默认返回值为该函数体语句的结果`
- 2.如果只有一个参数,函数体有多条语句 `则不需要用() 需要用{}默认返回值为retrun的结果`
- 3.如果有多个参数和多条函数体内容 `则必须使用()和{}`

<hr>

# JavaScrit 类

- JavaScript 生成实例的传统方法是通过构造函数下面是一个普通构造函数的例子
- Es6 的类完全可以堪称构造函数的另一种写法

## 详情

```js
function Demo(a, b) {
  this.a = a;
  this.b = b;
}
demo.prototype.sing = () => {
  console.log(`ok`);
};

let p = new Demo(1, 2);
```

- Es6 引入了更接近传统语言的写法,那就是引入了`Class(类)`这个概念,作为对象的模板,通过`Class`的关键字,可以定义类.
- 基本上,Es6 的 class 写法可以看作是一个语法糖,他的绝大部分功能,Es5 都可以做到,新的`Claas`写法只是让对象原型的写法更加清晰,更像面对对象编程的语法而已,上面的代码用 Es6 的`Class`改写,就是下面这样
- `实例`

```js
class Demo {
  constructor(x, y) {}

  sing() {
    console.log("ok");
    return `(${this.x} + ${this.y})`;
  }

  eat() {
    console.log("吃饭");
  }
}
```

- 上面 diamagnetic 定义了一个`类`,该类里面有一个`constructor`方法,这就是构造方法,而 this 关键字则代表实例对象,也就是说,Es5 的构造函数`Demo`对应 Es6 的`Demo`类的构造方法.
- Demo 类除了构造方法,还定义了一个`sing方法`
  - 注意:
    - 定义`类`的方法时候,前面不需要加上`function`这个关键字,直接把函数定义放进去就可以,另外方法之间不需要加逗号分隔,加了会报错.

### Class

- Class 可以用来定义类
- class 定义的类就相当一个函数,使用 typeof 检查该类时返回 function
- 类的数据类型就是函数,类本身就指向构造函数,使用的的时候直接对类使用`new`命令,跟构造函数的用法完全一致.反之直接报错.
- 构造函数的 prototype 属性,在 Es6 的`类`上面继续存在,事实上,类的所有方法都定义在类的 prototype 属性上面,在类的实例上面调用方法,其实就是调用原型上的方法.

### constructor 方法

- constructor 方法是类的默认方法,通过`new`命令生成实例对象时,自动调用该方法,一个类必须有 constructor 方法,如果没有显式定义,一个空的`constructor`方法会被默认添加
- `constructor`方法默认返回实例对象(this),完全可以指定返回另外一个对象
- 类必须使用`new`调用,否则会报错.这是他跟普通构造函数的一个主要区别,后者不用 new 也可以调用.
- `实例`

```js
class Point {}
\ /
  class Point {
    constructor() {}
  };
当定义了一个空的类Point, JavaScript引擎会自动为它添加一个空的constructor方法;
```

- `实例属性只有定义在constructor上才是实例的属性`,否则都是定义在原型上(即 class 上)
- 类的所有实例都共享一个原型对象.

```js
class Point {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  sing() {
    console.log("原型上的方法");
  }
}
let p = new Point(1, 2);
p.sing();
console.log(p.a, p.b);

console.log(p.hasOwnProperty("a")); //true
console.log(p.hasOwnProperty("b")); //true
console.log(p.__proto__.hasOwnProperty("sing")); //true
console.log(p.hasOwnProperty("sing")); //false
```

##  getter和setter

- 与Es5一样,在类的内部可以使用`get`和`set`关键字,对某个属性设置存值函数和取值函数,拦截该属性的存取行为
- 



<hr>

# JavaScript-Module(模块化)

## 概述

- 在 ES6 之前 JavaScript 一直没有模块化(module)体系,无法将一个大程序分为互相依赖的小文件,再用简单的方法拼装起来,其他语言都是有这项功能的,比如 css 的`@import`,但是 JavaScript 任何这方面的支持都没有,这时对大型的开发,复杂的项目形成了巨大障碍.

## 严格模式

- ES6 的模块自动采用严格模式,不管有没有在模块头部加上`use strict`
- 严格模式主要有以下限制
  - 1. 变量必须声明后再使用
  - 2. 函数的参数布恩那个有同名属性,否则报错
  - 3. 不能那个使用 with 语句
  - 4. 不能对只读属性赋值,否则报错
  - 5. 不能使用前缀 0 表示八进制数,否则报错

## 模块功能

### export 命令

- 模块功能主要有两个命令组成:`export`和`import`.export 命令用于规定模块的对外接口,import 命令用于输出其他模块提供的功能
- 一个模块就是一个独立的文件(js 文件),该文件内部的所有变量,外部无法读取,如果你希望外部能读取模块内部的某个变量,就必须使用`export`关键字输出该变量
- `实例`

```js
- 这是一个index.js文件 输出了该文件中的三个变量
export var first = 'Minchael';
export var last = 'Jackson';
export var year = '1997';


-简写
    -优先使用简写方式
            \/
var first = 'Minchael';
var last = 'Jackson';
var year = '1997';

export {first,last,year};
```

- export 命令除了输出变量,还可以输出函数或类(class)
- `实例`

```js
export function demo(x, y) {
  return x + y;
}
```

- `as关键字`

  - as 关键字可以重命名函数名字,对一个输出的变量可以用`as`关键字重命名多次
  - export 名字规定的时对外的接口,必须于模块内部的变量建立一一对应的关系
  - `实例`

  ```js
  function v1 (){....}
  function v2 (){....}

  export {
      v1 as streamV1,
      v2 as streamV2,
      v2 as streamV2s
  }
  ```

  - `错误实例`

  ```js
  export 1
  var m = 1;
  export m

  - 上面两种写法都会报错,一位内没有提供对外的接口,第一种写法直接输出1,第二种写法通过变量m,还是输出1,1只是一个值,不是接口,正确额写法是下面这样的  \/
  ```

- `正确写法`

  ```js
  export var m = 1;
  var m = 1;
  export {m}
  var n = 1;
  export {
      n as m;
  }

  export function n(){}

  function m (){}
  export {
      m as n;
  }

  function x(){}
  export {x};
  ```

- `export允许出现的位置`

  - export 命令可以出现在模块的任意位置,只要处于模块顶层就可以,如果处于快级作用域内`({exprot})`就报错,`import`命令也是如此
  - `例子`
  -

  ```js
  function demo (){
      export result 'bar'
  }
  demo();
  ```

  #### export 总结

  - export 用来导出 js 文件模块,以供其他文件进行使用
  - `export几种导出方式`

  ```js
  1. 使用export语法分别导出对应的模块接口 如下
  export var firstNmae = 'xxx';
  export var lastNmae = 'xxx';
  export var yaer = 1997;
  ```

2. 以接口的形式聚合导出(聚合)` 推荐使用
   var first = xxx;
   var last = xxx;
   export{first,last};

3) 使用 as 语法来对接口名称进行重命名
   var first = xxx;
   var last = xxx;
   var year = 1997;

export{
first as one,
last as two,
year,
year as three
}

````
<hr>

### import命令

- 使用export语法定义了模块的对外接口后,其他JS文件就可以通过import语法加载这个模块
- 使用import导入接口时接收`{}`{}里面指定要从其他模块导入的`变量名`,大括号里面的变量名,必须与被导入模块的对外接口名称相同
- `import`命令输入的变量都是`只读的`,因为它的本质是输出接口,也就是说,不允许再加载模块的脚本里面,改写接口
- 简单记忆:`export导出内容` `import使用{}接收导出对应的指定内容`


####  基本语法

- import需要使用`{}`和from的方式来导入对应`(export导出的变量 )`和模块
- `实例`
```js
import {first} from 'path.js'
- 导入时后缀可以省略
````

- `import提升?`

  - `import`具有提升效果,会提升到整个模块的头部,首先执行

  ```js
  fun();
  import {fun} from './function.js';
  - 解析
    - 该diamagnetic不会报错,因为import会提升 就相当于函数提升 所在调用在前不会报错 import在编译阶段执行(在代码运行之前)
  ```

- `import静态`

  - import 是静态执行的,所以`不可使用表达式和变量`,这些只有在运行时才能得到结果的语法结构

  ```js
  import {a + '1'} from './xxxx.js'
  if(a === 1){
      import {foo} from '.xxxxx'
  }else{
      import {bar} form '/xxxx'
  }
  以上写法全部报错
  ```

- `import是否会执行模块`

  - import 语句会执行所加载的模块,因此可以有如下写法

  ```js
  import './index.js
  直接执行
  ```

- `重复执行import`
  - 重复执行同一句 import 只会执行一次,不管重复几次加载的模块,始终都会执行一次
