const { Post } = require('../models')
console.log(Post)
class postCtrl {
    static async addPost(ctx, next) {
        try {
            await Post.create({
                title: 'xxxx'
            })
        } catch (error) {
            console.error(error)
        }
        ctx.body = {
            msg: '111'
        }
    }
}

module.exports = postCtrl