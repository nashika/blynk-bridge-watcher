Blynk = require 'blynk-library'

Base = require './base'
Bridge = require './bridges/bridge'

class Board extends Base

  ###*
  # @public
  # @type {Blynk.Blynk}
  ###
  blynk: null

  ###*
  # @public
  # @type {Object.<Bridge>}
  ###
  bridges: null

  ###*
  # @public
  # @type {Blynk.Blynk.VirtualPin}
  ###
  _inputVPin: null

  ###*
  # @constructor
  ###
  constructor: (parent, config) ->
    super parent, config

    token = @_checkConfig config, 'token', 'string'
    addr = @_checkConfig config, 'addr', 'string', ''
    port = @_checkConfig config, 'port', 'number', 0
    @log 'debug', "Auth dummy blynk board was started."
    options =
      connector: new Blynk.TcpClient
        addr: addr
        port: port
      #certs_path : './node_modules/blynk-library/certs/'
    @blynk = new Blynk.Blynk(token, options)

    @log 'debug', "Construct Input Virtual Pin 0 was started."
    @_inputVPin = new @blynk.VirtualPin(0)
    @log 'debug', "Construct Input Virtual Pin 0 was finished."

    @_initializeChildren config, 'bridges', Bridge

    @_inputVPin.on 'write', @_onInputVPin
    @blynk.on 'connect', @_onConnect

  _onConnect: =>
    @log 'debug', "Auth dummy blynk board was finished."
    for bridgeName, bridge of @bridges
      bridge.connect()

  _onInputVPin: (param) =>
    params = param[0].split(',')
    if params.length < 2
      @log 'error', "Input data '#{param}' is invalid format."
      return
    bridgeName = params[0]
    eventName = params[1]
    eventArgs = params.splice(2)
    @log 'trace', "Receive input data, bridge='#{bridgeName}' event='#{eventName}' args=#{JSON.stringify(eventArgs)}"
    if not @bridges[bridgeName]
      @log 'warn', "Bridge '#{bridgeName}' was not found."
      return
    if eventName is '$r'
      @bridges[bridgeName].sendCallback(eventArgs...)
      return
    if @bridges[bridgeName].listeners(eventName).length is 0
      @log 'warn', "Bridge '#{bridgeName}' not have '#{eventName}' event."
      return
    @bridges[bridgeName].emit eventName,  @bridges[bridgeName], eventArgs...

module.exports = Board
