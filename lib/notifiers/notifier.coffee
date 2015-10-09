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
  # @private
  # @type {boolean}
  ###
  _waiting: false

  ###*
  # @private
  # @type {Array}
  ###
  _messages: null

  ###*
  # @override
  ###
  constructor: (server, config, index) ->
    super server, config, index
    @_firstDelay = @_checkConfig config, 'firstDelay', 'number', @_firstDelay
    @_nextDelay = @_checkConfig config, 'nextDelay', 'number', @_nextDelay
    @_messages = []
    @on 'notify', @_onNotify
    @on 'send', @_onSend

  ###*
  # @protected
  # @param {Action} action
  # @param {Array} args
  ###
  _onNotify: (action, args...) =>
    message = @_makeMessage(action, args...)
    @_messages.push message
    if not @_waiting
      @_waiting = true
      setTimeout @_sendFirst, @_firstDelay

  ###*
  # @protected
  # @param {Array.<string>} messages
  ###
  _onSend: (messages) =>

  ###*
  # @protected
  ###
  _sendFirst: =>
    @emit 'send', @_messages
    @_pushes = []
    setTimeout @_sendNext, @_nextDelay

  ###*
  # @private
  ###
  _sendNext: =>
    if @_pushes.length is 0
      @_waiting = false
    else
      @emit 'send', @_messages
      @_pushes = []
      setTimeout @_sendNext, @_nextDelay

  ###*
  # @protected
  # @param {Action} action
  # @param {Array} args
  # @return {string}
  ###
  _makeMessage: (action, args...) =>
    message = action.message ? '%s'
    message = action.allKeyLabel() + ' ' + util.format(message, args...)
    return message

module.exports = Notifier
