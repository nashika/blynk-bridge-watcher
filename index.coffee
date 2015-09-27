require('source-map-support').install()

path = require 'path'

Blynk = require 'blynk-library'
log4js = require 'log4js'

global.core = require './lib/core'
config = require './config'
Bridge = require './lib/Bridge'

log4js.configure path.normalize(__dirname + '/./log4js-config.json'), {cwd: path.normalize(__dirname + '/.')}
core.logger = log4js.getLogger('system')



core.blynk = new Blynk.Blynk(config.board.token, options = {certs_path : './node_modules/blynk-library/certs/'})

core.inputVPin = new core.blynk.VirtualPin(0)

core.inputVPin.on 'write', (param) ->
  console.log 'V0 write: ' + param

core.blynk.on 'connect', ->
  for bridgeConfig in config.bridges
    core.bridges[bridgeConfig.name] = new Bridge(bridgeConfig)
