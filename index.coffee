require('source-map-support').install()

path = require 'path'
fs = require 'fs'

log4js = require 'log4js'
stripJsonComments = require 'strip-json-comments'

Server = require './lib/server'

# read config
configText = fs.readFileSync(path.normalize(__dirname + '/./config.json'), 'utf8')
config = JSON.parse(stripJsonComments(configText))

# initialize logger
log4js.configure path.normalize(__dirname + '/./log4js-config.json'), {cwd: path.normalize(__dirname + '/.')}
logger = log4js.getLogger('system')

global.server = new Server(config, logger, 0)
global.util = require 'util'
