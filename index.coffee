require('source-map-support').install()

path = require 'path'

log4js = require 'log4js'

config = require './config'
Server = require './lib/Server'

# initialize logger
log4js.configure path.normalize(__dirname + '/./log4js-config.json'), {cwd: path.normalize(__dirname + '/.')}
logger = log4js.getLogger('system')

server = new Server(config, logger, 0)
