---
published: true
title: '你真的理解原型和原型链吗？'
tags: Javascript
path: '/articles/prototype-proto'
date: '2022-07-20'
cover_image: ''
---


> 自己的话表述原型与原型链：每个对象在创建的时候都会预定义一些对象，每个函数对象都会有prototype属性，这个函数对象指向函数的**原型对象**。
> 当读取一个实例对象的属性时，会首先从这个对象本身查找该属性，如果没有找到就会去他的原型对象上查找，通过_proto_一级一级向上查找，直到查找到最高级Object.prototpe._proto,即原型链


首先我们先来列出几个等式，读者可以带着这些等式来阅读接下来的内容：
```js
var object = {}
object.__proto__ === Object.prototype // 为 true

var fn = function(){}
fn.__proto__ ===Function.prototype  // 为 true
fn.__proto__.__proto__ === Object.prototype // 为 true

var array = []
array.__proto__ === Array.prototype // 为 true
array.__proto__.__proto__ === Object.prototype // 为 true
Array.__proto__ === Function.prototype // 为 true
```

> “首先，我们来讲讲浏览器的初始状态，就是在无代码的情况下，浏览器所分配到的内存的使用情况，首先浏览器会创建一个全局对象global，而在这个全局对象global内含有许多的全局函数，例如global.parseInt、global.parseFloat、global.Number、global.String、global.Boolean、global.Object等等，函数也是对象的一种，因此也会具有属性，其中一种属性为prototype，这个属性的含义便是函数的原型对象。”
 
这段文字，其实大家只要关注最后加粗的地方即可，这也是我们第一句要记住的话：
**第一句话：prototype 是函数的原型对象，即prototype是一个对象，它会被对应的__proto__引用。**

接下来引入第二句要记住的话：
**第二句话：要知道自己的__proto__引用了哪个prototype，只需要看看是哪个构造函数构造了你，那你的__proto__就是那个构造函数的prototype。**

最后是第三句要记住的话，你可以将其理解成为第一句和第二句话的一个例外：
**第三句话：所有的构造函数的原型链最后都会引用Object构造函数的原型，即可以理解Object构造函数的原型是所有原型链的最底层，即Object.prototype.__proto===null**

好了，一切关于原型链的问题，都能够得到解决了，你不信？
行，那我们随便再出几道题目，然后来看看是不是通过两句话就能彻底解决出来。

### 第一道

```js
Object.__proto__ === ????填空???? // 为 true
```

**求Object.__proto__**，首先你要知道Object是什么数据类型，他是一个构造函数，也就是一个函数，来复习一下我们的第二句话，函数由哪个构造函数构造出来？那不是废话吗，当然是Function，因此很明显，答案就是：

```js
Object.__proto__ === Function.prototype // 为 true
```

### 第二道

```js
Function.__proto__ === ????填空???? // 为 true
```

求Function.__proto__，一样，你要先清楚Function是什么数据类型，他同样是一个构造函数，是来用来创建（构造）一个函数的构造函数（- -!有点拗口），所以同样的，用我们的第二句话即可解决，这个构造函数同样是函数，因此答案就是：

```js
Function.__proto__  === Function.prototype // 为 true
```

### 第三道
```js
Function.prototype.__proto__ === ????填空???? // 为 true
```

求Function.prototype.__proto__，好了，这里需要第一句话和第二句话一起用了，首先根据第一句话，prototype是一个对象，然后根据第二句话，那么既然它是一个对象，他的构造函数很明显就是Object，因此答案也呼之欲出了：

```js
Function.prototype.__proto__ ===Object.prototype // 为 true
```

### 第四道
```js
function Test(){}
var test=new Test()
test.__proto__===????填空???? // 为 true
```

对于自己写的构造函数，这三句话依然有效，因此答案也很容易就得出来了：
```js
test.__proto__===Test.prototype // 为 true
```

### 第五道
```js
Object.prototype.type = "x";
Function.prototype.type = "y";

function A() {};
const a = new A();

console.log(A.type);  
console.log(a.type); 
```
一道很常见的原型链的面试题，如果你知其然并且知其所以然，那我想你可以不用往下看了，如果你只是知其然却不知其所以然，或者其然都不知，那你就继续往下看，也许看完之后，你可以知其然并且知其所以然。

## 理解原型对象
首先我们来了解一下原型对象到底是什么？有什么用？
我们创建的每个构造函数都有一个 prototype 属性，这个属性是一个指针，指向一个对象，这个对象就是原型对象，原型对象中包含所有通过调用构造函数生成的实例对象所共享的属性和方法。很明显，使用原型对象的好处就是可以让所有实例对象共享他所包含的属性和方法。

```js
function Person(name) {
    this.name = name
}
Person.prototype.sayName = function() {
    console.log(this.name)
}
const person1 = new Person('Npz')
person1.sayName() // Npz
```

这里面主要有三个主体，构造函数，原型对象，实例对象。实例对象是通过调用构造函数生成的，然后实例对象调用了原型对象中的方法。那么这三者具体的关系是什么呢？

## 构造函数、原型对象、实例对象之间的关系
构造函数的 prototype 属性指向他的原型对象，然后原型对象有一个 constructor 属性，指向其构造函数，当调用构造函数生成一个实例对象之后，该实例的内部包含一个指针，指向其构造函数的原型对象，这个指针在 Safari、Chrome、Firefox 中的实现叫 __proto__。

```js
Person.prototype.constructor === Person // true
person1.__proto__ === Person.prototype // true
```

## 原型链是什么
```js
function Person(name) {
    this.name = name
}
Person.prototype.sayName = function() {
    console.log(this.name)
}
const person1 = new Person('Npz')
person1.sayName() // Npz
```

还是这段代码，想一下，person1 为什么可以调用 sayName 方法，其实，当读取一个实例对象的属性时，会首先从这个对象本身查找该属性，如果没有找到就会去他的原型对象上查找，也就是这个对象的 __proto__  属性指向的那个对象，所以，person1 调用的其实是 Person.prototype 上的 sayName 方法，那么如何判断这个属性是存在于实例本身还是原型对象中呢，可以使用 hasOwnProperty 方法

```js
person1.hasOwnProperty('sayName') // false
```
如果这个属性不存在于实例对象本身，就会返回 false，反之返回 true。

咦？这个 hasOwnProperty 方法又是哪来的呢？在 Person.prototype 上也并没有这个方法啊，其实这个方法是来自于 Object.prototype ，那又是怎么找到 Object.prototype 上的呢，其实就是通过原型链查找的，在这里我们要明确一个事情，原型对象本质上还是一个对象，而对象其实都是 new Object() 出来的，所以在这里，Person.prototype.__proto__ === Object.prototype，没错，如你所见，所有的原型对象其实也可以说是调用 Object 构造函数生成的实例对象，所以这里的原型对象的 __proto__ 指向的就是 Object 构造函数的 prototype 属性指向的对象，也就是 Object.prototype。
我们再来看一下 hasOwnProperty 这个方法的查找过程，首先实例对象本身没有，然后再往上他的原型对象 Person.prototype 中也没有，再接着就找到了 Object.prototype 上，这就是原型链了，通过 __proto__ 一层一层的向上查找，如果找到 Object.prototype 还没有找到的话，再往上就是 null 了

```js
Object.prototype.__proto__ === null // true
```

刚才我们有提到所有的原型对象其实就是调用 Object 构造函数生成的实例对象，那么 Object 构造函数又是怎么来的呢？

## 再看 Object 构造函数

构造函数也是函数，每个函数都是调用 Function 构造函数生成的实例，所以函数的声明还可以这么写

```js
const Object = new Function()
// 等价于
// function Object() {}
```

但是我们一般不会这么写，也不推荐这么写，但是从这个表达式，我们可以推断出 Object 构造函数其实就是调用 Function 构造函数生成的一个实例，所以 Object 构造函数的 __proto__ 指向的就是 Function.prototype，那我们再往上推， Function 构造函数又是哪来的呢，没了，Function 构造函数就是最顶级的构造器了，就好比 Object.prototype 是最顶级的原型对象一样。但是在 js 的实现中，我们会发现，Function 构造函数的 __proto__ 指向的是 Function.prototype, 而 Function.prototype.contructor 指向的还是 Function 构造函数，看起来像是 Function 构造函数又当🐔又当🥚一样，要我说，不用纠结这个，没有意义。

现在再来看下**第五道**的面试题
```js
Object.prototype.type = "x";
Function.prototype.type = "y";

function A() {};
const a = new A();

console.log(A.type);  
console.log(a.type); 
```

A.type，查找 type 属性，首先 A 本身没有，然后顺着他的 __proto__ 属性往上找，这里 A 是一个函数，所以他的 __proto__ 指向的就是 Function.prototype 了，接着就找到了 type 属性，值为 y

a.type，查找 type 属性，同样的 a 自身没有，然后 a.__proto__ 指向的应该是 A.prototype, 因为 a 是调用 A 构造函数生成的实例对象，然后也没有，再往上就是 Object.prototype了，找到了属性 type，值为 x


## 参考：
[你真的理解原型和原型链了吗](https://juejin.cn/post/7092300815452356644)
[三句话给你解释清楚原型和原型链](https://www.jianshu.com/p/7119f0ab67c0)