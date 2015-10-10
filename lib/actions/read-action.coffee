Action = require './action'

class ReadAction extends Action

  ###*
  # @protected
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
    @notifier = @_checkConfig config, 'notifier', 'string'
    @message = @_checkConfig config, 'message', 'string'

  ###*
  # @override
  ###
  run: (caller, args...) =>
    caller.notify this, args...

module.exports = ReadAction