require('source-map-support').install()

path = require 'path'

log4js = require 'log4js'

core = require './lib/core'
Board = require './lib/Board'


log4js.configure path.normalize(__dirname + '/./log4js-config.json'), {cwd: path.normalize(__dirname + '/.')}
core.logger = log4js.getLogger('system')

core.board = new Board()
