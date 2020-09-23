const { Version } = require('../models')
console.log(Version)
class VersionCtrl {
  static async checkUpdate(ctx, next) {
    console.log(ctx.body)
    console.log(ctx.query)
    console.log(ctx.params)
    const appVersion = ctx.query.version
    // const version = await Version.findAll()
    // const { app_version, wgt_url, android_pkg_url, ios_pkg_url } = version[0]
    const app_version = '1.0.3'
    if (appVersion < app_version) {
      if (appVersion.split('.')[0] < app_version.split('.')[0]) {
        // 大版本更新
        ctx.body = {
          update: true,
          wgtUrl: '/wgt/__UNI__F3FD86A.wgt',
          androidPkgUrl: 'android_pkg_url',
          iosPkgUrl: 'ios_pkg_url',
          appVersion: app_version,
          releaseNotes: '',
        }
      } else {
        // 小版本更新
        ctx.body = {
          update: true,
          wgtUrl: '/wgt/__UNI__F3FD86A.wgt',
          androidPkgUrl: '',
          appVersion: app_version,
          releaseNotes: ['更新版本号', '增加版本更新界面'],
        }
      }
    } else {
      //不更新
      ctx.body = {
        update: false,
        wgtUrl: '',
        androidPkgUrl: '',
        iosPkgUrl: '',
        appVersion: '',
      }
    }
  }
}

module.exports = VersionCtrl
