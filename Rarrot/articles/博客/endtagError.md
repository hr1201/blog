# 报错Element is missing end tag

搭建vitepress博客时，遇到报错Element is missing end tag：
![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310081127386.png)

原因:
因为vitepress会将md文件中的`'<>'`识别为HTML元素，由于这个元素没有结尾，所以报错。


解决方法:
例如:`"<T>"`，那么我们可以这样写`<T\>`，页面既不会显示为`"<T\>"`，也不会报错。<T\>