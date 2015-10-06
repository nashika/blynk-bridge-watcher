Notifier = require 'Notifier'

class LogNotifier extends Notifier

  constructor: (parent, config, index) ->
    super parent, config, index

  _onNotify: (options, args...) =>
    level = options?.level ? 'info'
    @log level, @_makeMessage(options, args...)
