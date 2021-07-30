## Plumemo 博客系统 sakura 主题 ssr服务端渲染版的安装使用

### 线上预览

https://www.bygit.cn/article/31

### 系统环境
1. 安装好java程序与后端管理系统
2. 安装node.js
3. 安装pm2

java的安装和管理系统的部署参考
https://www.nosum.cn/article/71
### node的安装

#### 创建目录

在/usr/local/ 下创建nodejs 目录

进入nodejs目录
cd /usr/local/nodejs

#### 下载node

```sh
wget https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz
```

#### 解压node

```sh
tar -xJvf 下载的文件名
```

解压后是个目录，把目录内的文件全部移动到 上级目录 也就是/usr/local/nodejs中

#### 创建软连接

```sh
ln -s /usr/local/nodejs/bin/node /usr/local/bin/
ln -s /usr/local/nodejs/bin/npm /usr/local/bin/
ln -s /usr/local/nodejs/bin/npx /usr/local/bin/
```

#### 测试node是否成功
```sh
node -v
npm -v
npx -v
```

### pm2的安装

运行命令
```sh
npm install pm2 -g
```

#### 创建软连接

```sh
ln -s /usr/local/nodejs/bin/pm2 /usr/local/bin/
```

#### 测试pm2是否成功

```sh
pm2 -v
```
### 部署程序

#### 程序源码下载

放到你自己存放的目录 比如我的 /home/www/blog/front
```sh
cd /home/www/blog/front
git clone https://gitee.com/baiyangc/nuxt-blog.git ./
```
后面./ 是直接到当前根目录 不创建文件夹

#### 程序配置（必看）
##### 服务端口的配置
服务启动后默认端口为http://127.0.0.1:3000
可在应用根目录 package.json 中配置端口
##### 域名配置
必须要在跟目录env.js中配置 开发环境和正式环境的访问链接 正式环境必须是你线上的域名不能是本地端口
##### 百度统计配置
在nuxt.config.js中把 script 中进入的百度统计 改成你的就可以了，如果不用 删掉就行
#### nginx的配置
```nginx
server {
   listen       443;
   server_name  www.bygit.cn bygit.cn;
   ssl on;
   ssl_certificate  /usr/local/nginx/conf/conf.d/blog.pem;
   #ssl证书的key文件路径
   ssl_certificate_key /usr/local/nginx/conf/conf.d/blog.key;
   location / {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;  
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_cache_bypass $http_upgrade;
    proxy_pass http://127.0.0.1:3000;
   } # 配置前端访问地址

   location /admin {
     root    /home/www/blog;
     index  index.html index.htm;
     try_files $uri $uri/ /admin/index.html;
    } # 配置后端访问地址

   location ^~ /api/blog {
     index  index.html index.htm index.php;
     index  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     index  proxy_set_header Host $host;
     index  proxy_set_header X-Real-IP $remote_addr;
     proxy_pass http://localhost:8086/api/plumemo-service; #后端服务器，配置upstream即可  
   }
}
server {
    listen 80;
    server_name www.bygit.cn bygit.cn;
    #将请求转成https
    rewrite ^(.*)$ https://$host$1 permanent;
}
```

主要看location / 这个配置，把/根目录转发到本地 http://127.0.0.1:3000 就是你启动的程序的端口

#### 安装依赖
```sh
npm install
```

#### 打包程序
```sh
npm run build
```

#### 启动服务
```sh
pm2 start npm --name "blog" -- run start
```
blog 为启动的服务的名字可自定义

### 结束

访问你的域名就可以了

[![alt text](https://image.bygit.cn/helloblog/image/3eb0fd43-02b9-422f-9e40-ee7775588906.jpg "阿里云")](https://www.aliyun.com/1111/new?userCode=luwg14ys)





