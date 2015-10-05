core = require './core'
BridgeBase = require './BridgeBase'

class BridgePing extends BridgeBase

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

  ###*
  # @override
  ###
  constructor: (board, config, vPin) ->
    super board, config, vPin
    @_pingIntervalMs = @config?.ping.interval ? @_pingIntervalMs
    @_pingTimeoutMs = @config?.ping.timeout ? @_pingTimeoutMs
    @_pingFailureLimit = @config?.ping.failureLimit ? @_pingFailureLimit
    @on '$ping', @_onPing
    @on '$pong', @_onPong
    @on '$notify', @_onNotify

  ###*
  # @override
  ###
  connect: =>
    core.logger.info "'#{@name}' bridge ping setting, interval=#{@_pingIntervalMs}ms timeout=#{@_pingTimeoutMs}ms failureLimit=#{@_pingFailureLimit}"
    @_pingIntervalId = setInterval @_ping, @_pingIntervalMs

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

module.exports = BridgePing
