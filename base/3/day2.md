# 继承

## 原型
- 原型本身是一个对象，这个对象的属性与方法可供其他对象。
- 任何对象都有成为原型的潜质，下面的代码就让obj成为了原型。

### 谁有原型
- 默认所有的对象都有原型

### 谁有prototype
- 默认所有的函数都有prototype

### 给对象手动添加prototype可以实现继承吗
- 没什么乱用，因为对象不能配合new关键字创建实例。

### 函数的特殊性 
- 函数也是对象的一种，所以也有__proto__
- 函数可以用来创建实例，又有prototype

### 如何访问一个对象的原型
- 通过__proto__属性（但是它是非标准属性，不建议开发中使用）
- 通过constructor属性得到对象的构造函数，再访问其prototype得到原型

### prototype的作用
- 用来引导构造函数创建的实例默认原型

### __proto__的作用
- 用来继承某个对象

### prototype与__proto__联系
- 通过构造函数创建的实例，实例的__proto__默认为构造函数的prototype，除此之外，没有任何联系。

## 构造函数创建对象的4个步骤
- 创建一个新对象(本质上就是开辟了一块内存空间)
- 设置新对象的原型
    + 本质上就是在这块内存空间中添加了一个__prot__属性
    + __proto__属性值与构造函数的prototype有关
    + 相当于是这样给__proto__赋值的：新对象.__proto__ = 构造函数.prototype
- 执行构造函数，执行时设置其this为新实例
- 返回新实例的地址

## 对象的属性访问规则
优先从自身查找，找不到就去原型找，还找不到继续去原型的原型找，
直到终点，终点也没有返回undefined。

## 对象的属性赋值
自己没有该属性相当于新增，有则修改，并不会对其原型上的属性造成影响。

## 继承
- 在js中，只要一个对象能够使用另一个对象的成员，这种特征就是继承。
- 在主流的面向对象语言中，继承是类与类之间的关系，在js中继承是对象与对象之间的关系。

## 继承方式

### 1、默认的原型继承
```javascript
function P() {}
P.prototype.fun = function(){};
var p = new P();
```

### 2、原型替换
```javascript
function P() {}
P.prototype = {
	constructor: P,
	fun: function(){}
};
var p = new P();
```

### 3、Object.create
```javascript
var proObj = {
	fun: function(){}
};
var p = Object.create(proObj);
```

### 4、原型组合式
```javascript
function A() {}
function P() {}
P.prototype = Object.create(A.prototype);
P.prototype = new A();
var p = new P();
```

## 属性复制
> 在日常开发中，可能会存在实现多继承的需求，上面的原型组合式就可以完成这个需求。
> 但是原型组合式如何嵌套过多，对于属性的查找效率是有影响的，而且过长的原型，也不利于维护。
> 对于实现多继承，还有另外一种解决方案，这种解决方案有一个代表，就是jQuery库中提供的extend方法。

### 实现属性复制函数封装
```javascrpt
function copy() {
	var target = arguments[0];
	for(var i = 1, len = arguments.length; i < len; i++) {
		for(var key in arguments[i]) {
			target[key] = arguments[i][key];
		}
	}
	return target;
}
```

### 关于for in遍历的补充
- 使用for in的方式遍历对象的属性，是无法遍历出js内置属性的。

### 使用属性copy的方式给原型添加属性的优点
- 不会覆写构造函数默认的prototype，那么对应的constructor属性就不会丢失
- 可以替代原型组合式的写法
- 使用灵活简单

## 原型的规律
-   原型链的终点统一是Object.prototype
-   对象的原型和该对象的类型有关
    + 比如Person的实例，原型是Person.prototype
    + 比如Animal的实例，原型是Animal.prototype
    - []的原型链结构
       + [] ==> Array.prototype ==> Object.prototype ==> null
    - {}的原型链结构
       + {} ==> Object.prototype ==> null
    - /abc/的原型链结构
       + /abc/ ==> RegExp.prototype ==> Object.prototype ==> null
    - Person的原型链结构
       + Person ==> Function.prototype ==> Object.prototype ==> null
    - Function的原型链结构
       + Function ==> Function.prototype ==> Object.prototype ==> null
    - Object的原型链结构
       + Object ==> Function.prototype ==> Object.prototype ==> null
-   构造函数默认的prototype，它统一都继承Object.prototype
    + 比如Person.prototype，原型是Object.prototype
    + 比如Animal.prototype，原型是Object.prototype
-   通过这个规则，可以自由猜想出任意一个实例所有的原型
    + 比如Book的实例，其原型结构为： Book实例 ==> Book.protoype ==> Object.prototype ==> null

## 原型链
- 一个对象，所有由__proto__联系在一起的原型，称之为这个对象的原型链。

## 如何研究一个对象的原型链结构
- 先通过__proto__得到对象的原型
- 然后访问这个原型的constructor属性，确定该原型的身份
- 然后继续按照上诉两个步骤，往上研究原型，最终就得到了对象的原型链。

## instanceof -- 运算符
- 作用：判断一个对象的原型链中是否含有某个构造函数的prototype
- 语法：对象 instanceof 构造函数
- 返回值：boolean

## hasOwnProperty -- 方法
- 作用：判断一个属性是不是自己的（不包含继承的属性）
- 语法：对象.hasOwnProperty(属性名)
- 返回值：boolean

## in -- 运算符
- 作用：判断能否使用某个属性（包含继承的属性）
- 语法：属性名 in 对象
- 返回值：boolean

## delete -- 运算符
- 作用：删除对象的属性
- 语法：delete 对象.属性名 || delete 对象[属性名]
- 返回值：boolean

## Function -- 内置构造函数
- 作用：创建函数实例
- 语法：new Function(形参1，形参2，...，代码体)
- 返回值：新创建的函数实例
- 特点：能够把字符串当做js脚本执行

## eval -- 内置的全局函数

- 作用：执行字符串代码

## for in的补充

* 可以即遍历一个对象自身的属性，也可以遍历继承来的属性；
* 但是不能遍历内置的属性。

