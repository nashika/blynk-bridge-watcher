PingBridge = require './ping-bridge'
ActionGenerator = require '../actions/action-generator'

class ActionBridge extends PingBridge

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

  notify: (action, args...) =>
    @_parent.notify action, args...

module.exports = ActionBridge
