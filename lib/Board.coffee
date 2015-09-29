
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
      core.logger.debug "Construct #{bridgeConfig.name} Bridge objects was started."
      @bridges[bridgeConfig.name] = new Bridge(this, bridgeConfig, i++)
      core.logger.debug "Construct #{bridgeConfig.name} Bridge objects was finished."
    core.logger.debug "Construct Bridge objects was finished."

    @inputVPin.on 'write', @onInputVPin
    @blynk.on 'connect', @onConnect

  onConnect: =>
    core.logger.debug "Auth dummy blynk board was finished."
    for bridgeConfig in config.bridges
      @bridges[bridgeConfig.name].connect()

  onInputVPin: (param) =>
    console.log 'V0 write: ' + param



module.exports = Board
