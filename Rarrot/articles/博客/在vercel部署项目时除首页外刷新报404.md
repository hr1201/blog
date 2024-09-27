# 在vercel部署项目时除首页外刷新报404

## 问题
最近在vercel上部署Vue3项目时，在除了首页外的页面刷新时会报404，如图：
![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202409271708224.png)

## 原因

这是因为vercel的路由配置问题，vercel默认会将所有的请求都重定向到首页，所以在刷新页面时会报404。

## 解决方法

在public文件夹下创建一个`_redirects`文件，然后在文件中添加以下内容：

```
/* /index.html 200
```

在项目根目录下创建一个`vercel.json`文件，然后在文件中添加以下内容：

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/$1"
    }
  ]
}
```

然后等待vercel重新部署项目即可。
