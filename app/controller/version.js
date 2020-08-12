const { Version } = require('../models')
class VersionCtrl {
  static async checkUpdate(ctx, next) {
    console.log(ctx.body)
    console.log(ctx.query)
    console.log(ctx.params)
    const appVersion = ctx.query.version
    // const version = await Version.findAll()
    // const { app_version, wgt_url, android_pkg_url, ios_pkg_url } = version[0]
    const app_version = '1.0.0'
    if (appVersion.split('.')[0] < app_version.split('.')[0]) {
      // 大版本更新
      ctx.body = {
        update: true,
        wgtUrl: '/wgt/__UNI__F3FD86A.wgt',
        androidPkgUrl: 'android_pkg_url',
        iosPkgUrl: 'ios_pkg_url',
      }
    } else {
      ctx.body = {
        update: true,
        wgtUrl: '/wgt/__UNI__F3FD86A.wgt',
        androidPkgUrl: '',
        iosPkgUrl: '',
      }
    }
  }
}

module.exports = VersionCtrl
