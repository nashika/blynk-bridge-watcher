Base = require './Base'

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

  _onNotify: (options, args...) =>
    logLevel = options?.level ? 'info'
    message = options?.message ? '%s'
    message = util.format(message, args...)
    @log 'info', message

module.exports = Notifier
