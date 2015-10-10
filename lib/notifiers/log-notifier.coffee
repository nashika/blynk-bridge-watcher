Notifier = require './notifier'

class LogNotifier extends Notifier

  ###*
  # @override
  ###
  _firstDelay: 0

  ###*
  # @protected
  # @type {number}
  ###
  _nextDelay: 0

  ###*
  # @override
  ###
  _onSend: (messages) =>
    for message in messages
      @log 'info', message

module.exports = LogNotifier
