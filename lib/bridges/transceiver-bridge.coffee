BaseBridge = require './base-bridge'
uid = require '../common/uid'

class TransceiverBridge extends BaseBridge

  ###*
  # @protected
  # @type {Object}
  ###
  _sendCallbacks: null

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    @_sendCallbacks = {}

  ###*
  # @public
  # @param {string} output
  ###
  send: (output = '', callback) =>
    while true
      requestId = uid(3)
      if @_sendCallbacks[requestId] then continue
      @_sendCallbacks[requestId] = callback
      break
    output += ",#{requestId}"
    @log 'debug', "Send output data, bridge='#{@name}' output='#{output}'"
    @_widgetBridge.virtualWrite 0, output

  sendCallback: (requestId, args...) =>
    if not callback = @_sendCallbacks[requestId]
      @log 'warn', "Request callback key='#{requestId}' not found."
      return
    callback(args...)
    delete @_sendCallbacks[requestId]

module.exports = TransceiverBridge
