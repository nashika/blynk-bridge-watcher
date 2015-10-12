Action = require './action'

class ReadAction extends Action

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

  ###*
  # @override
  ###
  run: (bridge, args...) =>
    output = ''
    switch @_pinType
      when 'digital' then output = 'dr'
      when 'analog' then output = 'ar'
      when 'virtual' then output = 'vr'
    output +=  ',' + @_pin
    bridge.send output, (args...) =>
      bridge.emit @_next, bridge, args...

module.exports = ReadAction
