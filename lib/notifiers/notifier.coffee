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
    @on 'notify', @_onNotify

  ###*
  # @protected
  # @param {Action} action
  # @param {Array} args
  ###
  _onNotify: (action, args...) =>
    @log 'error', "_onNotify method is abstract function"

  ###*
  # @protected
  # @param {Action} action
  # @param {Array} args
  # @return {string}
  ###
  _makeMessage: (action, args...) =>
    message = action.message ? '%s'
    message = util.format(message, args...)
    return message

module.exports = Notifier
