Event = require './Event'

class NotifyEvent extends Event

  ###*
  # @public
  # @type {string}
  ###
  notifier: ''

  ###*
  # @public
  # @type {string}
  ###
  message: ''

  constructor: (parent, config, index) ->
    super parent, config, index
    @checkConfig config.notifier, 'config.notifier', 'string'
    @notifier = config.notifier
    @checkConfig config.message, 'config.message', 'string'
    @message = config.message

  run: (caller, args...) =>
    @log 'debug', "Notify started."
    caller.notify this, args...

module.exports = NotifyEvent
