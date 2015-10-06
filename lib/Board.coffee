Blynk = require 'blynk-library'

Bridge = require './Bridge'

class Board

  ###*
  # @public
  # @type {string}
  ###
  name: ''

  ###*
  # @public
  # @type {Blynk.Blynk}
  ###
  blynk: null

  ###*
  # @protected
  # @type {Server}
  ###
  _server: null

  ###*
  # @public
  # @type {Blynk.Blynk.VirtualPin}
  ###
  _inputVPin: null

  ###*
  # @public
  # @type {Object.<Bridge>}
  ###
  bridges: null

  ###*
  # @constructor
  ###
  constructor: (server, config) ->
    @_server = server
    if not (typeof config is 'object')
      @log 'fatal', "Board config is invalid, expects object."
      process.exit 1
    if not (typeof config.name is 'string') or not config.name
      @log 'fatal', "Board config.name is invalid, expect string."
      process.exit 1
    @name = config.name
    if not (typeof config.token is 'string') or not config.token
      @log 'fatal', "Board token setting was invalid, expect string."
      process.exit 1
    @log 'debug', "Auth dummy blynk board was started."
    @blynk = new Blynk.Blynk(config.token, {certs_path : './node_modules/blynk-library/certs/'})
    @log 'debug', "Construct Input Virtual Pin 0 was started."
    @_inputVPin = new @blynk.VirtualPin(0)
    @log 'debug', "Construct Input Virtual Pin 0 was finished."
    @log 'debug', "Construct Bridge objects was started."
    @bridges = {}
    i = 1
    for bridgeConfig in config.bridges
      @bridges[bridgeConfig.name] = new Bridge(this, bridgeConfig, i++)
    @log 'debug', "Construct Bridge objects was finished."

    @_inputVPin.on 'write', @_onInputVPin
    @blynk.on 'connect', @_onConnect

  ###*
  # @public
  ###
  log: (level, args...) =>
    @_server.log level, "[Board-#{@name}]", args...

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
    @log 'debug', "Receive input data, bridge='#{bridgeName}' event='#{eventName}' args=#{JSON.stringify(eventArgs)}"
    if not @bridges[bridgeName]
      @log 'warn', "Bridge '#{bridgeName}' was not found."
      return
    if @bridges[bridgeName].listeners(eventName).length is 0
      @log 'warn', "Bridge '#{bridgeName}' not have '#{eventName}' event."
      return
    @bridges[bridgeName].emit eventName, eventArgs...

module.exports = Board
