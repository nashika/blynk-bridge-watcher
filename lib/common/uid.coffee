###*
# @param {number} size
# @param {string} base
# @return {string}
###
uid = (size, base) ->
  size = size ? 32
  base = base ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  len = base.length
  buf = []
  for i in [0..size-1]
    buf.push base[Math.floor(Math.random() * len)]
  return buf.join('')

module.exports = uid
