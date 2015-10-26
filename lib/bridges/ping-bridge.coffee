TransceiverBridge = require './transceiver-bridge'

class PingBridge extends TransceiverBridge

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
  constructor: (parent, config) ->
    super parent, config
    @_pingIntervalMs = @_checkConfig config, 'ping.interval', 'number', @_pingIntervalMs
    @_pingFailureLimit = @_checkConfig config, 'ping.failureLimit', 'number', @_pingFailureLimit
    @on '$ping', @_onPing

  ###*
  # @override
  ###
  connect: =>
    super()
    @log 'info', "Ping setting, interval=#{@_pingIntervalMs}ms timeout=#{@_pingTimeoutMs}ms failureLimit=#{@_pingFailureLimit}"
    setTimeout @_ping, 1000
    @_pingIntervalId = setInterval @_ping, @_pingIntervalMs

  _ping: =>
    @log 'debug', "Ping to bridge, waiting Pong..."
    if not @_pinging
      @send 'pi', @_pingCallback, @_pingTimeout
    @_pinging = true

  _pingCallback: =>
    @log 'debug', "Pong from bridge."
    @_pinging = false
    @status = @STATUS_TYPES.ready
    @_pingFailureCount = 0

  _pingTimeout: =>
    if @_pinging
      @_pingFailureCount++
      @log 'error', "Ping was no response, failure count #{@_pingFailureCount} / #{@_pingFailureLimit}."
      @_pinging = false
      if @_pingFailureCount >= @_pingFailureLimit
        @log 'error', "Ping failed #{@_pingFailureCount} times, the bridge will stop."
        @status = @STATUS_TYPES.error

  _onPing: =>
    @log 'debug', "Ping from bridge, response Pong."
    @send 'po', ((args...) =>), (=>)

module.exports = PingBridge
