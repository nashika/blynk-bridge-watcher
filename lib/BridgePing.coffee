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

  ###*
  # @override
  ###
  connect: =>
    @log 'info', "Ping setting, interval=#{@_pingIntervalMs}ms timeout=#{@_pingTimeoutMs}ms failureLimit=#{@_pingFailureLimit}"
    @_pingIntervalId = setInterval @_ping, @_pingIntervalMs

  _ping: =>
    @log 'info', "Ping to bridge, waiting Pong..."
    @widgetBridge.virtualWrite 0, '$ping' if not @_pinging
    @_pinging = true
    setTimeout @_pingTimeout, @_pingTimeoutMs

  _pingTimeout: =>
    if @_pinging
      @_pingFailureCount++
      @log 'error', "Ping was no response, failure count #{@_pingFailureCount} / #{@_pingFailureLimit}."
      @_pinging = false
      if @_pingFailureCount > @_pingFailureLimit
        @log 'error', "Ping failed #{@_pingFailureCount} times, this bridge will stop."
        clearInterval @_pingIntervalId
        @status = @STATUS_TYPE.error

  _onPing: =>
    @log 'info', "Ping from bridge, response Pong."
    @widgetBridge.virtualWrite 0, '$pong'

  _onPong: =>
    @log 'info', "Pong from bridge."
    @_pinging = false
    @_pingFailureCount = 0

module.exports = BridgePing
