util = require 'util'

Action = require './action'

class LogAction extends Action

  ###*
  # @protected
  # @type {string}
  ###
  _level: ''

  ###*
  # @protected
  # @type {string}
  ###
  _message: ''

  ###*
  # @override
  ###
  constructor: (parent, config) ->
    super parent, config
    @_level = @_checkConfig config, 'level', ['in', 'fatal', 'error', 'warn', 'info', 'debug', 'trace'], 'info'
    @_message = @_checkConfig config, 'message', 'string'

  ###*
  # @override
  ###
  run: (bridge, args...) =>
    bridge.log @_level, util.format(@_message, args...)

module.exports = LogAction
