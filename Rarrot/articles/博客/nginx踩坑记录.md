# nginx踩坑记录

## 配置项
location：location块用于定义如何处理不同URL路径的请求。它允许你根据请求的URI来选择相应的处理方式，例如代理到后端服务器、返回静态文件等。location块可以嵌套在server块内部。

location就像一个交通路口的红绿灯，它决定了当你的浏览器访问某个网址时，Nginx应该走哪条路。比如，你访问了http://example.com/news，location指令会让Nginx知道应该去找关于新闻的内容。

root：root指令用于指定请求的根目录。当Nginx接收到一个请求时，它会根据location块中的匹配规则找到对应的根目录，然后将请求的URI附加到该目录下，以查找请求的文件。这个指令就像是告诉你家的地址。当Nginx根据location找到了正确的方向后，它会去这个地址找你需要的东西。比如，root指令告诉Nginx：“你要找的东西在/var/www/html这个文件夹里。”

alias：alias指令与root类似，但它允许你为请求的URI指定一个不同的目标路径。alias会直接将请求的URI替换为目标路径，而不是将URI附加到目标路径下。

alias有点像一个快捷方式。有时候，你不想让Nginx去root指定的那个大文件夹里翻找，而是想让它直接去一个特定的小文件夹里找。alias就是用来做这个的。比如，alias指令告诉Nginx：“你不用去大文件夹里找了，直接去/var/www/static这个小文件夹里找吧。”

https://segmentfault.com/q/1010000045246611?utm_source=sf-similar-question

## 解决方式：
https://www.cnblogs.com/digdeep/p/10305143.html

## 正确配置：

```conf
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #'$status $body_bytes_sent "$http_referer" '
    #'"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen      8090;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root html/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
        location /api/ {
            proxy_pass http://127.0.0.1:8000/;
            # proxy_connect_timeout 3s;
        }

        #error_page  404              /404.html;
        #redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```