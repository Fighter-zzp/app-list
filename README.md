# app-list
使用typescript + node 做便签app

### 客户端

node+jquery实现客户端的页面展示

> 注册尚为制作



### 服务器

使用node+ts+mysql+express完成的服务器，使用路由转发不同的请求，这里大部份使用路径参数

> 由于我经常写后台，所以服务器的结构是跟java后台的结构相似
>
> ```
> ├─src
> │  ├─app 服务
> │  ├─config 配制mysql
> │  ├─db 数据库操作
> │  ├─mapper 数据库映射 dao
> │  ├─router 路由转发 controller
> │  ├─service 服务层
> │  └─util 工具
> |  └─main.ts 启动服务器
> ```
>
> 