BridgeCustomEvent = require './BridgeCustomEvent'

class Bridge extends BridgeCustomEvent

  ###*
  # @override
  ###
  constructor: (board, config, vPin) ->
    @log 'debug', "Construct objects was started."
    super board, config, vPin
    @log 'debug', "Construct objects was finished."

  ###*
  # @override
  ###
  connect: =>
    @log 'info', "Connect bridge was started."
    super()
    @log 'info', "Connect bridge was finished."

module.exports = Bridge
