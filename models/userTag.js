const UserTag=require('../lib/mongo').UserTag

module.exports = {
  // 注册一个tag
  create: function create (tag) {
    return UserTag.create(tag).exec()
  }
}