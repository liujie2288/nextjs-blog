---
title: 'Immutable.js'
date: '2021-06-15'
---

## Immutable.js官网介绍

不变的数据一旦创建就无法更改，从而可以简化应用程序开发，无需防御性复制，并可以使用简单的逻辑实现高级的备忘和更改检测技术。

Immutable.js提供了一个可变API，该API不会就地更新数据，而是总会产生新的更新数据。

Immutable.js提供了许多永久不可变数据结构，包括： List，Stack，Map，OrderedMap，Set，OrderedSet和Record。

这些数据结构在现代JavaScript VM上非常高效，通过使用哈希映射尝试和向量尝试（通过Clojure和Scala普及）的结构共享，可以最大限度地减少复制或缓存数据的需求。



## 使用Immutable意义

`immutable`的意义在于弥补了javascript中没有不可突变的数据结构，贴合了函数式编程思想（组件根本上就是函数用法）。

Javascript中的对象是可变的，可变的好处是节省内存或者利用可变做一些事情，但是，在复杂开发中它的副作用远比好处大的多。于是就有了“浅拷贝”和“深拷贝”。比如: `Object.assign`,`jQuery.extends({},a,b)`。

相比于，传统拷贝方式，immutable可更高效，更大限度的减少复制，提高程序性能。



## Immutable自我认识

`immutable.js`是Facebook用于创建javascript不可突变对象的工具库。

因为javascript对象赋值是“引用赋值”，导致在操作javascript对象时影响到了其它的复制对象，所以我们经常会通过`deepClone`的方式复制一个全新的javascript对象，但是这样通过把所有节点都复制一次的方式，会带来一定的性能损耗。实际情况通常是，我们只会操作对象的一小部分数据。

Immutable.js通过结构共享的方式，降低了对象复制时的性能开销，同时也会为我们创建了一个全新的对象。

> 结构共享：如果树中的一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享

![immutabled节点变化](https://upload-images.jianshu.io/upload_images/2165169-cebb05bca02f1772?imageMogr2/auto-orient/strip|imageView2/2/w/613/format/webp)



## Immutable优点

1. 降低突变数据带来的复杂度。
   Javascript对象引用赋值特性，可能导致操作对象时，影响到其他复制的数据，导致应用BUG，并且后期不好排查修改的源头，但是immutable每次操作都创建了一个新的对象。
   
2. 节省内存空间。
   如前面所说，immutable会结构共享，尽可能的复用内存对象。
   
3. 简单的数据恢复/撤销。
   因为每次都产生新的对象，可以方便的回退到某一个数据状态
   
4. 拥抱函数式编程。
   不可变性本就是函数编程的核心思想。相同输入，相同输出，无副作用。
   


参考链接：

- [imutable.js GitHub地址](https://github.com/immutable-js/immutable-js)
- [immuable意义何在，使用场景](https://www.zhihu.com/question/28016223)
- [Immutable.js了解一下？](https://www.jianshu.com/p/0fa8c7456c15)
- [Immutable是如何实现结构共享的？](https://zhuanlan.zhihu.com/p/27133830?group_id=851585269567213568)
