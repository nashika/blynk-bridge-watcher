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

  ###*
  # @public
  # @type {string}
  ###
  name: ''

  constructor: (board, config, vPin) ->
    core.logger.debug "Construct #{config.name} bridge objects was started."
    @board = board
    @config = config
    @widgetBridge = new @board.blynk.WidgetBridge(vPin)

    if not config.name
      core.logger.error "config.name was not defined."
      process.exit 1
    @name = config.name

    @on '$ping', @_onReceivePing
    @on '$pong', @_onReceivePong
    @on '$notify', @_onNotify
    core.logger.debug "Construct '#{@name}' bridge objects was finished."

  connect: =>
    core.logger.debug "Connect '#{@name}' bridge was started."
    @widgetBridge.setAuthToken @config.token
    core.logger.debug "Connect '#{@name}' bridge was finished."
    setInterval @ping, 60000

  ping: =>
    core.logger.info "Ping to '#{@name}' bridge, waiting Pong..."
    @widgetBridge.virtualWrite 0, '$ping'

  _onReceivePing: =>
    core.logger.info "Ping from '#{@name}' bridge, response Pong."
    @widgetBridge.virtualWrite 0, '$pong'

  _onReceivePong: =>
    core.logger.info "Pong from '#{@name}' bridge."

  _onNotify: (message) =>
    core.logger.info "Notify from '#{@name}' bridge, message='#{message}'"

module.exports = Bridge
