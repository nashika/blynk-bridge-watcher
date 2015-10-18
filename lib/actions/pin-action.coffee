Action = require './action'

class PinAction extends Action

  ###*
  # @protected
  # @type {string}
  ###
  _pinType: ''

  ###*
  # @protected
  # @type {number}
  ###
  _pin: -1

  ###*
  # @override
  ###
  constructor: (parent, config) ->
    super parent, config
    @_pinType = @_checkConfig config, 'pinType', ['in', 'digital', 'analog', 'virtual']
    @_pin = @_checkConfig config, 'pin', 'number'

module.exports = PinAction
