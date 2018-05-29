// @flow
module.exports = (app) => {
  app.use('/api', require('./users')) // 在所有users路由前加/api
  app.use('/info', require('./userinfos'))
  app.use('/car', require('./cars'))
  app.use('/order', require('./orders'))
  app.use('/fav', require('./favs'))
  app.use('/address', require('./addresses'))
  app.use('/judge', require('./judges'))
}
