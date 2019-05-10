const Hosinfo=require('../lib/mongo').Hosinfo

module.exports = {
  // 注册一个hosinfo
  create: function create (hosinfo) {
    return Hosinfo.create(hosinfo).exec()
  }
}