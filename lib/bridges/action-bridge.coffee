PingBridge = require './ping-bridge'
ActionGenerator = require '../actions/action-generator'

class ActionBridge extends PingBridge

  ###*
  # @protected
  # @type {Object.<Event>
  ###
  actions: null

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    @_initializeChildrenWithGenerator config, 'actions', ActionGenerator
    for actionName, action of @actions
      @on actionName, action.run

module.exports = ActionBridge
