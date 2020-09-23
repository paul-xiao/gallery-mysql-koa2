const { Post, User } = require('../models')
console.log(Post, User)
class postCtrl {
    static async addPost(ctx, next) {
        try {
            await Post.create({
                user_id: 2,
                title: 'xxxx'
            })
            ctx.body = {
                msg: '添加成功'
            }
        } catch (error) {
            ctx.body = {
                msg: error.name
            }
        }

    }
}

module.exports = postCtrl