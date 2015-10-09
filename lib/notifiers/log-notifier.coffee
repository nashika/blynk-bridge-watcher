Notifier = require './notifier'

class LogNotifier extends Notifier

  constructor: (parent, config, index) ->
    super parent, config, index

  _onNotify: (action, args...) =>
    level = action?.level ? 'info'
    @log level, @_makeMessage(action, args...)

module.exports = LogNotifier
