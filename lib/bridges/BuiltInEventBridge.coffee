util = require 'util'

PingBridge = require './PingBridge'

class BuiltInEventBridge extends PingBridge

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

  notify: (event, args...) =>
    @_parent.notify event, args...

module.exports = BuiltInEventBridge
