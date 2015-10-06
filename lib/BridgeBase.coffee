EventEmitter = require('events').EventEmitter

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
  # @type {string}
  ###
  name: ''

  ###*
  # @public
  # @type {Object}
  ###
  status: @::STATUS_TYPE.constructing

  ###*
  # @protected
  # @type {Board}
  ###
  _board: null

  ###*
  # @protected
  # @type {string}
  ###
  _token: ''

  ###*
  # @protected
  # @type {Blynk.Blynk.WidgetBridge}
  ###
  _widgetBridge: null

  ###*
  # @constructor
  # @param {Board} board
  # @param {Object} config
  # @param {number} vPin
  ###
  constructor: (board, config, vPin) ->
    @_board = board
    if not (typeof config is 'object')
      @log 'fatal', "Bridge config is invalid, expects object."
      process.exit 1
    if not (typeof config.name is 'string') or not config.name
      @log 'fatal', "Bridge config.name is invalid, expects string."
      process.exit 1
    @name = config.name
    if not (typeof config.token is 'string') or not config.token
      @log 'fatal', "Bridge config.token is invalid, expects string."
      process.exit 1
    @_token = config.token
    @_widgetBridge = new @_board.blynk.WidgetBridge(vPin)

  ###*
  # @public
  ###
  connect: =>
    @status = @STATUS_TYPE.connecting
    @_widgetBridge.setAuthToken @_token
    @status = @STATUS_TYPE.ready

  log: (level, args...) =>
    @_board.log level, "[Bridge-#{@name}]", args...

module.exports = BridgeBase
