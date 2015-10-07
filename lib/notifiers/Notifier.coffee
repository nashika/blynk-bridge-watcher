Base = require './../base'

class Notifier extends Base

  ###*
  # @override
  ###
  TYPE: 'Notifier'

  ###*
  # @override
  ###
  constructor: (server, config, index) ->
    super server, config, index
    @on '$notify', @_onNotify

  _onNotify: (action, args...) =>
    @log 'info', @_makeMessage(action, args...)

  _makeMessage: (action, args...) =>
    message = options?.message ? '%s'
    message = util.format(message, args...)
    return message

module.exports = Notifier
