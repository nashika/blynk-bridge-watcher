
Blynk = require 'blynk-library'

core = require './core'
config = require '../config'
Bridge = require './Bridge'

class Board

  ###*
  # @public
  # @type {Blynk.Blynk}
  ###
  blynk: null

  ###*
  # @public
  # @type {Blynk.Blynk.VirtualPin}
  ###
  inputVPin: null

  ###*
  # @public
  # @type {Object.<Bridge>}
  ###
  bridges: null

  ###*
  # @constructor
  ###
  constructor: ->
    core.logger.debug "Auth dummy blynk board was started."
    @blynk = new Blynk.Blynk(config.board.token, {certs_path : './node_modules/blynk-library/certs/'})
    core.logger.debug "Construct Input Virtual Pin 0 was started."
    @inputVPin = new @blynk.VirtualPin(0)
    core.logger.debug "Construct Input Virtual Pin 0 was finished."
    core.logger.debug "Construct Bridge objects was started."
    @bridges = {}
    i = 1
    for bridgeConfig in config.bridges
      @bridges[bridgeConfig.name] = new Bridge(this, bridgeConfig, i++)
    core.logger.debug "Construct Bridge objects was finished."

    @inputVPin.on 'write', @_onInputVPin
    @blynk.on 'connect', @_onConnect

    core.logger.debug "Construct Notifier objects was started."
    for notifierConfig in config.notifiers
    core.logger.debug "Construct Notifier objects was finished."

  _onConnect: =>
    core.logger.debug "Auth dummy blynk board was finished."
    for bridgeConfig in config.bridges
      @bridges[bridgeConfig.name].connect()

  _onInputVPin: (param) =>
    params = param[0].split(',')
    if params.length < 2
      core.logger.error "Input data '#{param}' is invalid format."
      return
    bridgeName = params[0]
    eventName = params[1]
    eventArgs = params.splice(2)
    core.logger.debug "Receive input data, bridge='#{bridgeName}' event='#{eventName}' args=#{JSON.stringify(eventArgs)}"
    if not @bridges[bridgeName]
      core.logger.warn "Bridge '#{bridgeName}' was not found."
      return
    if @bridges[bridgeName].listeners(eventName).length is 0
      core.logger.warn "Bridge '#{bridgeName}' not have '#{eventName}' event."
      return
    @bridges[bridgeName].emit eventName, eventArgs...

module.exports = Board
