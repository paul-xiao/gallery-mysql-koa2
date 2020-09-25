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
npx sequelize-cli model:generate --force --name User --attributes username:string,avatar:string,email:string,password:string,phone:string
npx sequelize-cli model:generate --name Test --attributes username:'{}'
npx sequelize-cli model:generate --name Version --attributes wgt_url:string,android_pkg_url:string,ios_pkg_url:string,app_version:string

# post
npx sequelize-cli model:generate --force --name Post --attributes user_id:string,title:string,desc:string,content:string,thunmbnails:string

# comments 
npx sequelize-cli model:generate --force --name Comment --attributes user_id:string,post_id:string,comment:string

# user_post_like_relation 
npx sequelize-cli model:generate --force --name user_post_like_relation --attributes user_id:string,post_id:string

# user_post_comment_like_relation 
npx sequelize-cli model:generate --force --name user_post_comment_like_relation --attributes user_id:string,post_id:string,comment_id:string

# migrations
npx sequelize-cli db:migrate

# generate seed file
npx sequelize-cli seed:generate --name user

# excute seeds
npx sequelize-cli db:seed:all

# foreigon key

 Post.init({
    user_id: {
      type: INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: STRING,
    desc: STRING,
    content: STRING,
    thunmbnails: STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
# issue
- User Model undefined  ==> 重新生成User Model后正常
- 外键未设置   allowNull: false 不生效


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

## CSRF (跨站请求伪造: cross-site request forgery)

- [koa-csrf](https://github.com/koajs/csrf)
- [csurf](https://github.com/expressjs/csurf)

## redis

- [安装](https://github.com/microsoftarchive/redis/releases)
- 运行

```
redis-server.exe redis.windows.conf

yarn add ioredis
```

- [方案](https://www.dazhuanlan.com/2019/12/17/5df84172d36ee/)
  - koa-redis + koa-generic-session
  - ioredis+koa-session

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

## 部署

1. 安装 mysql

```sh

rpm -ivh http://repo.mysql.com/yum/mysql-5.7-community/el/7/x86_64/mysql57-community-release-el7-10.noarch.rpm

yum install mysql-community-server -y
systemctl start mysqld
systemctl enable mysqld
mysql -uroot -p$(awk '/temporary password/{print $NF}' /var/log/mysqld.log)
# 数据库默认密码规则必须携带大小写字母、特殊符号，字符长度大于8否则会报错。因此设定较为简单的密码时需要首先修改set global validate_password_policy和_length参数值。

set global validate_password_policy=0;
set global validate_password_length=1;
set password for root@localhost = password('123456');
```

2. 创建 bare 仓库

```sh
# init bare
git init --bare server.igt

# post-update hooks

echo "server update"
GIT_REPO=/root/update_test/api.git
TMP_GIT_CLONE=/root/update_test/tmp/api
PUBLIC_WWW=/root/update_test/api

rm -rf ${TMP_GIT_CLONE}
git clone $GIT_REPO $TMP_GIT_CLONE
rm -rf ${PUBLIC_WWW}
cp -rf ${TMP_GIT_CLONE} ${PUBLIC_WWW}

# push

git push -f ssh://paul@144.34.184.214:28080/home/paul/server.git master
git push -f ssh://root@47.240.93.218/root/update_test/api.git master


```

3. nginx 配置

```sh

location ^~ /api {
proxy_pass http://127.0.0.1:3000;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

}


start nginx  # 启动 nginx
nginx -s reload  # 重新载入配置文件
nginx -s reopen # 重启 nginx
nginx -s stop  # 停止 nginx
```

4. 启动服务

```sh
sudo yum -y install nodejs


```
## REFS

1. [常见六大 web 安全问题](https://www.cnblogs.com/fundebug/p/details-about-6-web-security.html)
