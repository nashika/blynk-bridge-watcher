util = require 'util'

BridgePing = require './BridgePing'

class BridgeBuiltInEvent extends BridgePing

  ###*
  # @override
  ###
  constructor: (board, config, vPin) ->
    super board, config, vPin
    @on '$log', @_onLog
    @on '$l', @_onLog
    @on '$notify', @_onNotify
    @on '$n', @_onNotify
    @on '$read', @_onRead
    @on '$r', @_onRead
    @on '$write', @_onWrite
    @on '$w', @_onWrite
    @on '$if', @_onIf

  _onLog: (options, args...) =>
    logLevel = options?.level ? 'info'
    message = options?.message ? '%s'
    message = util.format(message, args...)
    @log logLevel, message

  _onNotify: (options, args...) =>

  _onRead: (options, args...) =>

  _onWrite: (options, args...) =>

  _onIf: (options, args...) =>

module.exports = BridgeBuiltInEvent
