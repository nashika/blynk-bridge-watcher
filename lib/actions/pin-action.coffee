Action = require './action'

class PinAction extends Action

  ###*
  # @protected
  # @type {string}
  ###
  _next: ''

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
  constructor: (parent, config, index) ->
    super parent, config, index
    @_next = @_checkConfig config, 'next', 'string'
    @_pinType = @_checkConfig config, 'pinType', 'string'
    @_pin = @_checkConfig config, 'pin', 'number'

module.exports = PinAction
