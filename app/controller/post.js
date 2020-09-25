const fs = require('fs')
const path = require('path')
const { Post } = require('../models')
const payload = require('../auth/payload')
const { UPLOAD_PATH, REMOTE_PATH } = require('../config')
class postCtrl {
    static async addPost(ctx, next) {
        try {
            const { user_id, ...rest } = ctx.request.body
            const { thumbnails } = ctx.request.files
            const reader = fs.createReadStream(thumbnails['path']);
            let filePath = path.join(path.resolve(__dirname, UPLOAD_PATH), thumbnails['name'])
            let remoteFilePath = `${REMOTE_PATH}${thumbnails['name']}`;
            const upStream = fs.createWriteStream(filePath);
            reader.pipe(upStream);
            await Post.create({
                user_id,
                thumbnails: remoteFilePath,
                ...rest
            })
            ctx.body = {
                msg: '添加成功'
            }
        } catch (error) {
            console.log(error)
            ctx.body = {
                msg: error
            }
        }

    }
    static async removePost(ctx, next) {
        try {
            const postId = ctx.params.id
            const [res] = await Post.findByPk(postId)
            if (!res.length) throw '已删除'
            const thumbnails = res[0].thumbnails
            const filePath = path.join(path.resolve(__dirname, UPLOAD_PATH), thumbnails)
            console.log(fs.existsSync(filePath))
            fs.existsSync(filePath) && fs.unlinkSync(filePath) //删除文件
            await Post.removeByPK(postId)
            ctx.body = {
                msg: " 删除成功"
            }
        } catch (error) {
            console.log(error)
            ctx.body = {
                msg: error
            }
        }
    }
    static async ToggleLikes(ctx) {
        try {

            const token = ctx.header.authorization
            const { id } = await payload(token)
            const { post_id } = ctx.request.body
            const [res] = await Post.isLikeExists({ user_id: id, post_id })
            let status = 0
            if (!res.length) {
                status = 1
                Post.addLike({
                    user_id: id, post_id, status
                })
            } else {
                status = res[0].status === 1 ? 0 : 1
                Post.updateLike({ status }, {
                    user_id: id, post_id,
                })
            }
            ctx.body = {
                msg: status === 1 ? '点赞成功' : '点赞取消'
            }
        } catch (error) {
            console.log(error)
            ctx.body = {
                msg: error
            }
        }
    }
    static async findAll(ctx) {
        try {
            const [res] = await Post.findAllWithLikes()
            ctx.body = res
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = postCtrl