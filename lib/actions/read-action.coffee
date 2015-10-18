PinAction = require './pin-action'

class ReadAction extends PinAction

  ###*
  # @protected
  # @type {string}
  ###
  _next: ''

  ###*
  # @override
  ###
  constructor: (parent, config) ->
    super parent, config
    @_next = @_addSubAction parent, config, 'next'

  ###*
  # @override
  ###
  run: (bridge, args...) =>
    @log 'debug', "Read action. type=#{@_pinType}, pin=#{@_pin}"
    switch @_pinType
      when 'digital' then command = 'dr'
      when 'analog' then command = 'ar'
      when 'virtual' then command = 'vr'
    bridge.send command, @_pin, (args...) =>
      bridge.emit @_next, bridge, args... if @_next

module.exports = ReadAction
