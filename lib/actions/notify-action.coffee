Action = require './action'

class NotifyAction extends Action

  ###*
  # @protected
  # @type {string}
  ###
  _notifier: ''

  ###*
  # @public
  # @type {string}
  ###
  message: ''

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    @_notifier = @_checkConfig config, 'notifier', 'string'
    @message = @_checkConfig config, 'message', 'string'

  ###*
  # @override
  ###
  run: (bridge, args...) =>
    bridge.parent.parent.notifiers[@_notifier].emit 'notify', this, args...

module.exports = NotifyAction
