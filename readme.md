# node server side service with mysql

## mysql install

- [安装](https://www.cnblogs.com/Lemon-ZYJ/p/11275012.html)

## mysql config

- 初始化密码

```sql
 alter user 'root'@'localhost' identified by 'passwd';
```

## errors

- Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

```sql
# mysql8.0以上加密方式，Node还不支持。

alter user 'root'@'localhost' identified with mysql_native_password by 'passwd';

flush privileges;
```

## 常用命令

- 新建数据库

```sql
create database db_name
```

## 建表

- users

```sql
create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     userName VARCHAR(100) NOT NULL COMMENT '用户名',
     passwd VARCHAR(100) NOT NULL COMMENT '密码',
     avator VARCHAR(100) NOT NULL COMMENT '头像',
     moment VARCHAR(100) NOT NULL COMMENT '注册时间',
     PRIMARY KEY ( id )
    );

```

- posts

```sql
create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '文章作者',
     title TEXT(0) NOT NULL COMMENT '评论题目',
     content TEXT(0) NOT NULL COMMENT '评论内容',
     md TEXT(0) NOT NULL COMMENT 'markdown',
     uid VARCHAR(40) NOT NULL COMMENT '用户id',
     moment VARCHAR(100) NOT NULL COMMENT '发表时间',
     comments VARCHAR(200) NOT NULL DEFAULT '0' COMMENT '文章评论数',
     pv VARCHAR(40) NOT NULL DEFAULT '0' COMMENT '浏览量',
     avator VARCHAR(100) NOT NULL COMMENT '用户头像',
     PRIMARY KEY(id)
    );

```

- comments

```sql
create table if not exists comment(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名称',
     content TEXT(0) NOT NULL COMMENT '评论内容',
     moment VARCHAR(40) NOT NULL COMMENT '评论时间',
     postid VARCHAR(40) NOT NULL COMMENT '文章id',
     avator VARCHAR(100) NOT NULL COMMENT '用户头像',
     PRIMARY KEY(id)
    );

```

## Sequelize

- cli

```sh
# init
npx sequelize-cli init

# create db
npx sequelize-cli db:create

# create table
npx sequelize-cli model:generate --name User --attributes username:string,avatar:string,email:string,password:string
npx sequelize-cli model:generate --name Test --attributes username:'{}'

# migrations
npx sequelize-cli db:migrate

# generate seed file
npx sequelize-cli seed:generate --name user

# excute seeds
npx sequelize-cli db:seed:all


```

## restful api

## hot reload

- [koa-webpack](https://github.com/shellscape/koa-webpack)

```js
const Koa = require('koa');
const koaWebpack = require('koa-webpack');

const app = new Koa();
const options = { .. };
const middleware = await koaWebpack(options);

app.use(middleware);

```

## Q&A

1. sequelize-cli 参数为什么没有设置字符长度
   > 不确定, 貌似用不着
2. Cannot resolve module 'fs'

   > using node webpack will compile for usage in a Node.js-like environment (uses Node.js require to load chunks and not touch any built in modules like fs or path).

   ```js
    // webpack.config.js
   {
    ...,
    target: 'node'
   }
    // refs: https://v4.webpack.js.org/concepts/targets/
   ```

3. webpack hot reload

   > webpack-dev-middleware

4. no cookie
   > [引入 mockjs 导致 XHR 无法携带 cookie 的问题](https://www.jianshu.com/p/fe5f775b541d/)
