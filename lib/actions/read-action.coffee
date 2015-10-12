PinAction = require './pin-action'

class ReadAction extends PinAction

  ###*
  # @override
  ###
  run: (bridge, args...) =>
    switch @_pinType
      when 'digital' then command = 'dr'
      when 'analog' then command = 'ar'
      when 'virtual' then command = 'vr'
    bridge.send command, @_pin, (args...) =>
      bridge.emit @_next, bridge, args...

module.exports = ReadAction
