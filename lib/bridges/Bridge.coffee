CustomActionBridge = require './custom-action-bridge'

class Bridge extends CustomActionBridge

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
