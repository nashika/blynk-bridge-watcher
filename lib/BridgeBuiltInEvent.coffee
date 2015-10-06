util = require 'util'

BridgePing = require './BridgePing'

class BridgeBuiltInEvent extends BridgePing

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    @on '$notify', @_onNotify
    @on '$n', @_onNotify
    @on '$read', @_onRead
    @on '$r', @_onRead
    @on '$write', @_onWrite
    @on '$w', @_onWrite
    @on '$if', @_onIf

  _onNotify: (options, args...) =>

  _onRead: (options, args...) =>

  _onWrite: (options, args...) =>

  _onIf: (options, args...) =>

module.exports = BridgeBuiltInEvent
