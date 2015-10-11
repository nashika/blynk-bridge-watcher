BaseBridge = require './base-bridge'

class PingBridge extends BaseBridge

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
  constructor: (parent, config, index) ->
    super parent, config, index
    @_pingIntervalMs = @_checkConfig config, 'ping.interval', 'number', @_pingIntervalMs
    @_pingTimeoutMs = @_checkConfig config, 'ping.timeout', 'number', @_pingTimeoutMs
    @_pingFailureLimit = @_checkConfig config, 'ping.failureLimit', 'number', @_pingFailureLimit
    @on '$ping', @_onPing
    @on '$pong', @_onPong

  ###*
  # @override
  ###
  connect: =>
    super()
    @log 'info', "Ping setting, interval=#{@_pingIntervalMs}ms timeout=#{@_pingTimeoutMs}ms failureLimit=#{@_pingFailureLimit}"
    @_pingIntervalId = setInterval @_ping, @_pingIntervalMs

  _ping: =>
    @log 'info', "Ping to bridge, waiting Pong..."
    @_widgetBridge.virtualWrite 0, 'pi' if not @_pinging
    @_pinging = true
    setTimeout @_pingTimeout, @_pingTimeoutMs

  _pingTimeout: =>
    if @_pinging
      @_pingFailureCount++
      @log 'error', "Ping was no response, failure count #{@_pingFailureCount} / #{@_pingFailureLimit}."
      @_pinging = false
      if @_pingFailureCount >= @_pingFailureLimit
        @log 'error', "Ping failed #{@_pingFailureCount} times, the bridge will stop."
        clearInterval @_pingIntervalId
        @status = @STATUS_TYPE.error

  _onPing: =>
    @log 'info', "Ping from bridge, response Pong."
    @_widgetBridge.virtualWrite 0, 'po'

  _onPong: =>
    @log 'info', "Pong from bridge."
    @_pinging = false
    @_pingFailureCount = 0

module.exports = PingBridge
