## 自己封装的模板引擎

* 给window添加了一个Tmp对象, 调用Tmp对象的setConfine能改变模板引擎边界规则, 
* 不能改成{}为边界的形式
* 默认的规则是: 诺是变量使用{%=变量%}, 诺是其他使用{%模板%}

