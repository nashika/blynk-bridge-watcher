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
  constructor: (parent, config) ->
    super parent, config
    @_pingIntervalMs = @_checkConfig config, 'ping.interval', 'number', @_pingIntervalMs
    @_pingTimeoutMs = @_checkConfig config, 'ping.timeout', 'number', @_pingTimeoutMs
    @_pingFailureLimit = @_checkConfig config, 'ping.failureLimit', 'number', @_pingFailureLimit
    @on '$ping', @_onPing

  ###*
  # @override
  ###
  connect: =>
    super()
    @log 'info', "Ping setting, interval=#{@_pingIntervalMs}ms timeout=#{@_pingTimeoutMs}ms failureLimit=#{@_pingFailureLimit}"
    @_pingIntervalId = setInterval @_ping, @_pingIntervalMs

  _ping: =>
    @log 'info', "Ping to bridge, waiting Pong..."
    if not @_pinging
      @send 'pi', @_pingCallback
    @_pinging = true
    setTimeout @_pingTimeout, @_pingTimeoutMs

  _pingCallback: =>
    @log 'info', "Pong from bridge."
    @_pinging = false
    @_pingFailureCount = 0

  _pingTimeout: =>
    if @_pinging
      @_pingFailureCount++
      @log 'error', "Ping was no response, failure count #{@_pingFailureCount} / #{@_pingFailureLimit}."
      @emit '$pingFailure'
      @_pinging = false
      if @_pingFailureCount >= @_pingFailureLimit
        @log 'error', "Ping failed #{@_pingFailureCount} times, the bridge will stop."
        clearInterval @_pingIntervalId
        @status = @STATUS_TYPES.error
        @emit '$pingFailureLimit'

  _onPing: =>
    @log 'info', "Ping from bridge, response Pong."
    @send 'po'

module.exports = PingBridge
