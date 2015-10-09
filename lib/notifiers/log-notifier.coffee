Notifier = require './notifier'

class LogNotifier extends Notifier

  ###*
  # @override
  ###
  _onSend: (messages) =>
    for message in messages
      @log 'info', message

module.exports = LogNotifier
