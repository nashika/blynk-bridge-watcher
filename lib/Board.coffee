Blynk = require 'blynk-library'

Base = require './Base'
Bridge = require './Bridge'

class Board extends Base

  ###*
  # @override
  ###
  TYPE: 'Board'

  ###*
  # @public
  # @type {Blynk.Blynk}
  ###
  blynk: null

  ###*
  # @public
  # @type {Blynk.Blynk.VirtualPin}
  ###
  _inputVPin: null

  ###*
  # @public
  # @type {Object.<Bridge>}
  ###
  _bridges: null

  ###*
  # @constructor
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    @checkConfig config.token, 'config.token', 'string'
    @log 'debug', "Auth dummy blynk board was started."
    @blynk = new Blynk.Blynk(config.token, {certs_path : './node_modules/blynk-library/certs/'})
    @log 'debug', "Construct Input Virtual Pin 0 was started."
    @_inputVPin = new @blynk.VirtualPin(0)
    @log 'debug', "Construct Input Virtual Pin 0 was finished."
    @log 'debug', "Construct Bridge objects was started."
    @_bridges = {}
    i = 0
    for bridgeConfig in config.bridges
      @_bridges[bridgeConfig.name] = new Bridge(this, bridgeConfig, i++)
    @log 'debug', "Construct Bridge objects was finished."

    @_inputVPin.on 'write', @_onInputVPin
    @blynk.on 'connect', @_onConnect

  _onConnect: =>
    @log 'debug', "Auth dummy blynk board was finished."
    for bridgeName, bridge of @_bridges
      bridge.connect()

  _onInputVPin: (param) =>
    params = param[0].split(',')
    if params.length < 2
      @log 'error', "Input data '#{param}' is invalid format."
      return
    bridgeName = params[0]
    eventName = params[1]
    eventArgs = params.splice(2)
    @log 'debug', "Receive input data, bridge='#{bridgeName}' event='#{eventName}' args=#{JSON.stringify(eventArgs)}"
    if not @_bridges[bridgeName]
      @log 'warn', "Bridge '#{bridgeName}' was not found."
      return
    if @_bridges[bridgeName].listeners(eventName).length is 0
      @log 'warn', "Bridge '#{bridgeName}' not have '#{eventName}' event."
      return
    @_bridges[bridgeName].emit eventName, eventArgs...

module.exports = Board
