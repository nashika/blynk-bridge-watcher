Base = require './Base'

class BridgeBase extends Base

  ###*
  # @override
  ###
  TYPE: 'Bridge'

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
  # @type {Object}
  ###
  status: @::STATUS_TYPE.constructing

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

  constructor: (parent, config, index) ->
    super parent, config, index
    @checkConfig config.token, 'config.token', 'string'
    @_token = config.token
    @_widgetBridge = new @_parent.blynk.WidgetBridge(index + 1)

  ###*
  # @public
  ###
  connect: =>
    @status = @STATUS_TYPE.connecting
    @_widgetBridge.setAuthToken @_token
    @status = @STATUS_TYPE.ready

module.exports = BridgeBase
