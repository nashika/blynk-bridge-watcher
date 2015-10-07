BuiltInActionBridge = require './built-in-action-bridge'
ActionGenerator = require '../actions/action-generator'

class CustomActionBridge extends BuiltInActionBridge

  ###*
  # @protected
  # @type {Object.<Event>
  ###
  _actions: null

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    @_actions = {}
    i = 0
    if config.actions
      actionGenerator = new ActionGenerator(this)
      @checkConfig config.actions, 'config.actions', 'array'
      @log 'debug', "Construct event objects was started."
      for actionConfig in config.actions
        @_actions[actionConfig.name] = actionGenerator.generate(this, actionConfig, i)
        @on actionConfig.name, @_actions[actionConfig.name].run
      @log 'debug', "Construct event objects was finished."

module.exports = CustomActionBridge
