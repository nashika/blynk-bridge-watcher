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
  constructor: (parent, config) ->
    super parent, config
    @_sendCallbacks = {}

  ###*
  # @public
  # @param {string} output
  ###
  send: (command, params..., callback) =>
    if @status isnt @STATUS_TYPES.ready then return
    pin = params[0] ? 0
    param = params[1] ? ''
    while true
      requestId = uid(3)
      if @_sendCallbacks[requestId] then continue
      @_sendCallbacks[requestId] = callback
      break
    output = "#{requestId},#{command},#{pin},#{param}"
    @log 'trace', "Send output data, bridge='#{@name}' output='#{output}'"
    @_widgetBridge.virtualWrite 0, output

  sendCallback: (requestId, args...) =>
    if not callback = @_sendCallbacks[requestId]
      @log 'warn', "Request callback key='#{requestId}' not found."
      return
    callback(args...)
    delete @_sendCallbacks[requestId]

  write: (type, pin, value) =>
    if @status isnt @STATUS_TYPES.ready then return
    switch type
      when 'digital'
        @_widgetBridge.digitalWrite pin, value
      when 'analog'
        @_widgetBridge.analogWrite pin, value
      when 'virtual'
        @_widgetBridge.virtualWrite pin, value

module.exports = TransceiverBridge
