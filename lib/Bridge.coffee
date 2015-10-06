BridgeCustomEvent = require './BridgeCustomEvent'

class Bridge extends BridgeCustomEvent

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    parent.log 'debug', "Construct #{config.name} bridge object was started."
    super parent, config, index
    @log 'debug', "Construct #{config.name} bridge objects was finished."

  ###*
  # @override
  ###
  connect: =>
    @log 'info', "Connect bridge was started."
    super()
    @log 'info', "Connect bridge was finished."

module.exports = Bridge
