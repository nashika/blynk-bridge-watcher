path = require 'path'

Blynk = require 'blynk-library'
log4js = require 'log4js'

core = './lib/core'
config = './config'

log4js.configure path.normalize(__dirname + '/./log4js-config.json'), {cwd: path.normalize(__dirname + '/.')}
core.logger = log4js.getLogger('system')



for boardConfig in config.boards
  core.boardsblynk = new Blynk.Blynk('', options = {certs_path : './node_modules/blynk-library/certs/'})

v1 = new blynk.VirtualPin(1)

v1.on 'write', (param) ->
  console.log 'V1 write: ' + param

