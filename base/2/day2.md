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
但是原型组合式如何嵌套过多，对于属性的查找效率是有影响的，而且过长的原型，也不利于维护。
对于实现多继承，还有另外一种解决方案，这种解决方案有一个代表，就是jQuery库中提供的extend方法。

