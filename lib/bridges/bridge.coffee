PingBridge = require './ping-bridge'

class Bridge extends PingBridge

  ###*
  # @override
  ###
  constructor: (parent, config) ->
    super parent, config

  ###*
  # @override
  ###
  connect: =>
    @log 'info', "Connect bridge was started."
    super()
    @log 'info', "Connect bridge was finished."

module.exports = Bridge
