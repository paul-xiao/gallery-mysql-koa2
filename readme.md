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
