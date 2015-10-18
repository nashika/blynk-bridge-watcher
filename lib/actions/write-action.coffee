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
    @log 'debug', "Write action. type=#{@_pinType}, pin=#{@_pin}, value=#{@_value}"
    bridge.write @_pinType, @_pin, @_value

module.exports = WriteAction
