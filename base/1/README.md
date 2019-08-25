# 基础知识

## 一、typeof

1、	typeof [] 的执行结果是 (_‘object’_)

2、	typeof 123 的执行结果是 (_’number’_)

3、	typeof null 的执行结果是 (_’object’_)

4、	typeof undefined 的执行结果是 (_’undefined’_)

5、	typeof function(){} 的执行结果是 (_’function’_)

6、	typeof运算符运算后有一个返回结果，这个结果它自身的数据类型是 (_’string’_)

##	二、数据类型转换	

1、!!{} 的执行结果是 (_true_)

2、!!0 的执行结果是 (_false_)

3、!!null 的执行结果是 (_false_)

4、!!undefined 的执行结果是 (_false_)

5、!!NaN 的执行结果是 (_false_)

6、!![] 的执行结果是 (_true_)

7、!false 的执行结果是 (_true_)

8、!200 的执行结果是 (_false_)

##	三、相等判断

1、	1 == true 的执行结果为 (_true_)

2、	0 == false 的执行结果为 (_true_)

3、	6 == [6] 的执行结果为 (_true_)

4、	0 == [] 的执行结果为 (_true_)

5、0 == null 的执行结果为 (_false_)

6、false == undefined 的执行结果为 (_false_)

7、null == undefined 的执行结果为 (_true_)

8、{} == {} 的执行结果为 (_false_)

9、“[object Object]”== {} 的执行结果为 (_true_)

10、NaN == NaN 的执行结果为 (_false_)

11、NaN == flase 的执行结果为 (_false _)

12、[] == false 的执行结果为 (_true_)

13、[1,2] ==“1,2 ”的执行结果为 (_true__)


## 四、运算符

1、var val = []? 1 : 2; val的值为 (_1_)。

2、var a = 1 - 1? 10 : 20; a的值为 (_20_)。

3、null && {} && 2的执行结果为 (_null_)

4、123 && 321 && 0 的执行结果为 (_0_)

5、[] && 0 && false 的执行结果为 (_0_)

6、1 || false || null 的执行结果为 (_1_)

7、0 || undefined || NaN || 3 的执行结果为 (_3_)

## 五、arguments

1、arguments是代表实参的对象，还是形参的对象：(_实参_)

2、arguments的(_length_)属性可以用来获取实参的个数

3、如何通过arguments获取实参：(_下标_)

4、arguments是对象还是数组：(_对象_)

5、实参和形参的关系：(_形参_)用来接收(_实参_)传递过来的数据
