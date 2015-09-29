core = require './core'

class Bridge

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

  constructor: (board, config, vPin) ->
    @board = board
    @config = config
    @widgetBridge = new @board.blynk.WidgetBridge(vPin)

  connect: =>
    @widgetBridge.setAuthToken(@config.token)

module.exports = Bridge
