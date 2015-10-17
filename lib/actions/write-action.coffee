PinAction = require './pin-action'

class WriteAction extends PinAction

  ###*
  # @protected
  # @type {number}
  ###
  _value: -1

  ###*
  # @override
  ###
  constructor: (parent, config) ->
    super parent, config
    @_value = @_checkConfig config, 'value', 'number'

  ###*
  # @override
  ###
  run: (bridge, args...) =>
    switch @_pinType
      when 'digital' then command = 'dw'
      when 'analog' then command = 'aw'
      when 'virtual' then command = 'vw'
    bridge.send command, @_pin, @_value, (args...) =>
      bridge.emit @_next, bridge, args... if @_next

module.exports = WriteAction
