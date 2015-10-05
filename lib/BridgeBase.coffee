EventEmitter = require('events').EventEmitter

core = require './core'

class BridgeBase extends EventEmitter

  ###*
  # @const
  # @type {Object}
  ###
  STATUS_TYPE:
    constructing:
      label: 'Constructing'
    connecting:
      label: 'Connecting'
    ready:
      label: 'Ready'
    error:
      label: 'Error'

  ###*
  # @public
  # @type {Board}
  ###
  board: null

  ###*
  # @public
  # @type {Object}
  ###
  config: null

  ###*
  # @public
  # @type {Blynk.Blynk.WidgetBridge}
  ###
  widgetBridge: null

  ###*
  # @public
  # @type {string}
  ###
  name: ''

  ###*
  # @public
  # @type {Object}
  ###
  status: @::STATUS_TYPE.constructing

  constructor: (board, config, vPin) ->
    @board = board
    @config = config
    @widgetBridge = new @board.blynk.WidgetBridge(vPin)

    if not config.name
      core.logger.error "config.name was not defined."
      process.exit 1
    @name = config.name

    @on '$notify', @_onNotify

  connect: =>
    @status = @STATUS_TYPE.connecting
    @widgetBridge.setAuthToken @config.token
    @status = @STATUS_TYPE.ready

module.exports = BridgeBase
