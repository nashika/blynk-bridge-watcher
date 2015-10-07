Base = require '../Base'

class Event extends Base

  ###*
  # @override
  ###
  TYPE: 'Event'

  ###*
  # @protected
  # @type {string}
  ###
  event: ''

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    @checkConfig config.event, 'config.event', 'string'
    @event = config.event

  ###*
  # @public
  # @param {Base} caller
  ###
  run: (caller, args...) =>
    @log 'debug', "Notify started."
    caller.emit @event, caller, args...

module.exports = Event
