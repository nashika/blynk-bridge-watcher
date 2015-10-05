EventEmitter = require('events').EventEmitter

core = require './core'

class Bridge extends EventEmitter

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

  ###
  # @protected
  # @type {boolean}
  ###
  _pinging: false

  ###
  # @protected
  # @type {number}
  ###
  _pingIntervalMs: 60000

  ###
  # @protected
  # @type {number}
  ###
  _pingTimeoutMs: 5000

  ###*
  # @protected
  # @type {number}
  ###
  _pingFailureLimit: 3

  ###*
  # @protected
  # @type {number}
  ###
  _pingFailureCount: 0

  ###*
  # @protected
  # @type {number}
  ###
  _pingIntervalId: 0

  constructor: (board, config, vPin) ->
    core.logger.debug "Construct #{config.name} bridge objects was started."
    @board = board
    @config = config
    @widgetBridge = new @board.blynk.WidgetBridge(vPin)

    if not config.name
      core.logger.error "config.name was not defined."
      process.exit 1
    @name = config.name
    @_pingIntervalMs = @config?.ping.interval ? @_pingIntervalMs
    @_pingTimeoutMs = @config?.ping.timeout ? @_pingTimeoutMs
    @_pingFailureLimit = @config?.ping.failureLimit ? @_pingFailureLimit

    @on '$ping', @_onPing
    @on '$pong', @_onPong
    @on '$notify', @_onNotify
    core.logger.debug "Construct '#{@name}' bridge objects was finished."

  connect: =>
    core.logger.info "Connect '#{@name}' bridge was started."
    @status = @STATUS_TYPE.connecting
    @widgetBridge.setAuthToken @config.token
    core.logger.info "Connect '#{@name}' bridge was finished."
    core.logger.info "'#{@name}' bridge ping setting, interval=#{@_pingIntervalMs}ms timeout=#{@_pingTimeoutMs}ms failureLimit=#{@_pingFailureLimit}"
    @_pingIntervalId = setInterval @_ping, @_pingIntervalMs
    @status = @STATUS_TYPE.ready

  _ping: =>
    core.logger.info "Ping to '#{@name}' bridge, waiting Pong..."
    @widgetBridge.virtualWrite 0, '$ping' if not @_pinging
    @_pinging = true
    setTimeout @_pingTimeout, @_pingTimeoutMs

  _pingTimeout: =>
    if @_pinging
      @_pingFailureCount++
      core.logger.error "Ping to '#{@name}' bridge is no response, failure count #{@_pingFailureCount} / #{@_pingFailureLimit}."
      @_pinging = false
      if @_pingFailureCount > @_pingFailureLimit
        core.logger.error "Ping to '#{@name}' bridge failed #{@_pingFailureCount} times, this bridge will stop."
        clearInterval @_pingIntervalId
        @status = @STATUS_TYPE.error

  _onPing: =>
    core.logger.info "Ping from '#{@name}' bridge, response Pong."
    @widgetBridge.virtualWrite 0, '$pong'

  _onPong: =>
    core.logger.info "Pong from '#{@name}' bridge."
    @_pinging = false
    @_pingFailureCount = 0

  _onNotify: (message) =>
    core.logger.info "Notify from '#{@name}' bridge, message='#{message}'"

module.exports = Bridge
