EventEmitter = require('events').EventEmitter

core = require './core'

class Bridge extends EventEmitter

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
    core.logger.debug "Construct #{config.name} bridge objects was started."
    @board = board
    @config = config
    @widgetBridge = new @board.blynk.WidgetBridge(vPin)
    @on '$ping', @_onPing
    @on '$notify', @_onNotify
    core.logger.debug "Construct '#{@config.name}' bridge objects was finished."

  connect: =>
    core.logger.debug "Connect '#{@config.name}' bridge was started."
    @widgetBridge.setAuthToken @config.token
    core.logger.debug "Connect '#{@config.name}' bridge was finished."

  _onPing: =>
    core.logger.info "Ping from '#{@config.name}' bridge, response Pong."
    @widgetBridge.virtualWrite 0, '$pong'

  _onNotify: (message) =>
    core.logger.info "Notify from '#{@config.name}' bridge, message='#{message}'"

module.exports = Bridge
