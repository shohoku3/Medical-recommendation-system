const config=require('../config/default')
const Mongolass=require('mongolass')
const mongolass=new Mongolass()
mongolass.connect(config.mongodb)

exports.User = mongolass.model('User', {
  name: { type: 'string', required: true },
  password: { type: 'string', required: true },
  avatar: { type: 'string', required: true },
  phonenum: { type: 'string', required: true }
})

exports.UserTag = mongolass.model('UserTag', {
  name: { type: 'string', required: true },
  prefences: { type: 'string', required: true }
})


exports.User.index({ name: 1 }, { unique: true }).exec()
exports.UserTag.index({ name: 1 }, { unique: true }).exec()