util = require 'util'

PingBridge = require './ping-bridge'

class BuiltInActionBridge extends PingBridge

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    #@on '$notify', @_onNotify
    #@on '$n', @_onNotify
    #@on '$read', @_onRead
    #@on '$r', @_onRead
    #@on '$write', @_onWrite
    #@on '$w', @_onWrite
    #@on '$if', @_onIf

  notify: (action, args...) =>
    @_parent.notify action, args...

module.exports = BuiltInActionBridge
