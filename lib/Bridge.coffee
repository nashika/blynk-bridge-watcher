core = require './core'
BridgeEvent = require './BridgeEvent'

class Bridge extends BridgeEvent

  ###*
  # @override
  ###
  constructor: (board, config, vPin) ->
    core.logger.debug "Construct #{config.name} bridge objects was started."
    super board, config, vPin
    core.logger.debug "Construct '#{@name}' bridge objects was finished."

  ###*
  # @override
  ###
  connect: =>
    core.logger.info "Connect '#{@name}' bridge was started."
    super()
    core.logger.info "Connect '#{@name}' bridge was finished."

module.exports = Bridge
