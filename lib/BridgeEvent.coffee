core = require './core'
BridgePing = require './BridgePing'

class BridgeEvent extends BridgePing

  ###*
  # @override
  ###
  constructor: (board, config, vPin) ->
    super board, config, vPin
    @on '$notify', @_onNotify

  _onNotify: (message) =>
    core.logger.info "Notify from '#{@name}' bridge, message='#{message}'"

module.exports = BridgeEvent
