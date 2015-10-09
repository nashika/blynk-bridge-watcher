Action = require './action'

class NotifyAction extends Action

  ###*
  # @public
  # @type {string}
  ###
  notifier: ''

  ###*
  # @public
  # @type {string}
  ###

  ###*
  # @public
  # @type {string}
  ###
  message: ''

  constructor: (parent, config, index) ->
    super parent, config, index
    @notifier = @_checkConfig config, 'notifier', 'string'
    @message = @_checkConfig config, 'message', 'string'

  run: (caller, args...) =>
    @log 'debug', "Notify started."
    caller.notify this, args...

module.exports = NotifyAction
