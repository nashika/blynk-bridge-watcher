ActionBridge = require './action-bridge'

class Bridge extends ActionBridge

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index

  ###*
  # @override
  ###
  connect: =>
    @log 'info', "Connect bridge was started."
    super()
    @log 'info', "Connect bridge was finished."

module.exports = Bridge
