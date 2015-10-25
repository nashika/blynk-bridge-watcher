BaseBridge = require './base-bridge'
uid = require '../common/uid'

class TransceiverBridge extends BaseBridge

  ###*
  # @const
  # @type {number}
  ###
  SEND_TIMEOUT: 10000

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
  send: (command, params..., callback, failureCallback) =>
    if command isnt 'pi' and @status isnt @STATUS_TYPES.ready
      @log 'warn', "Send command='#{command}' params=#{JSON.stringify(params)} can not run. Bridge status='#{@status.label}' is not ready."
      return
    pin = params[0] ? 0
    param = params[1] ? ''
    loop
      requestId = uid(3)
      break if not @_sendCallbacks[requestId]
    @_sendCallbacks[requestId] = callback
    output = "#{requestId},#{command},#{pin},#{param}"
    setTimeout @_sendFailureCallback, @SEND_TIMEOUT, requestId, failureCallback, output
    @log 'trace', "Send data='#{output}'"
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

  _sendFailureCallback: (requestId, failureCallback, output) =>
    if not @_sendCallbacks[requestId] then return
    @log 'warn', "Request key='#{requestId}' output='#{output}' was timeout."
    delete @_sendCallbacks[requestId]
    failureCallback()

module.exports = TransceiverBridge
