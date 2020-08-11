const { Version } = require('../models')
class VersionCtrl {
  static async checkUpdate(ctx, next) {
    const appVersion = ctx.query.version
    const version = await Version.findAll()
    const { app_version, wgt_url, android_pkg_url, ios_pkg_url } = version[0]
    if (appVersion.split('.')[0] < app_version.split('.')[0]) {
      // 大版本更新
      ctx.body = {
        update: true,
        wgtUrl: '',
        androidPkgUrl: android_pkg_url,
        iosPkgUrl: ios_pkg_url,
      }
    } else {
      ctx.body = {
        update: true,
        wgtUrl: wgt_url,
        androidPkgUrl: '',
        iosPkgUrl: '',
      }
    }
  }
}

module.exports = VersionCtrl
