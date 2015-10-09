Base = require './../base'

class Notifier extends Base

  ###*
  # @override
  ###
  TYPE: 'Notifier'

  ###*
  # @protected
  # @type {number}
  ###
  _firstDelay: 3000

  ###*
  # @protected
  # @type {number}
  ###
  _nextDelay: 10000

  ###*
  # @override
  ###
  constructor: (server, config, index) ->
    super server, config, index
    @_firstDelay = @_checkConfig config, 'firstDelay', 'number', @_firstDelay
    @_nextDelay = @_checkConfig config, 'nextDelay', 'number', @_nextDelay
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
