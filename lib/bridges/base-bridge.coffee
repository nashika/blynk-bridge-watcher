Base = require './../base'
ActionGenerator = require '../actions/action-generator'

class BaseBridge extends Base

  ###*
  # @const
  # @type {Object}
  ###
  STATUS_TYPES:
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
  status: @::STATUS_TYPES.constructing

  ###*
  # @public
  # @type {Object.<Action>}
  ###
  actions: null

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

  constructor: (parent, config) ->
    super parent, config
    @log 'info', "Connect bridge was started."
    @_token = @_checkConfig config, 'token', 'string'
    @_widgetBridge = new @parent.blynk.WidgetBridge(Object.keys(parent.bridges).length + 1)
    @_initializeChildrenWithGenerator config, 'actions', ActionGenerator
    for actionName, action of @actions
      @on actionName, action.run
      for alias in action.aliases
        @on alias, action.run

  ###*
  # @public
  ###
  connect: =>
    @log 'info', "Connection started."
    @status = @STATUS_TYPES.connecting
    @_widgetBridge.setAuthToken @_token

  ###*
  # @override
  ###
  log: (level, args...) =>
    super level, args...
    @emit "$#{level}", this, "#{args.join(' ')}"

module.exports = BaseBridge
