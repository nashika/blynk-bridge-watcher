Base = require '../base'

class Action extends Base

  ###*
  # @protected
  # @type {string}
  ###
  type: ''

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    @type = @_checkConfig config, 'type', 'string'

  ###*
  # @public
  # @param {Base} caller
  ###
  run: (caller, args...) =>
    @log 'error', "Action.run is abstract function"

  _addSubAction: (parent, config, key) =>
    ActionGenerator = require './action-generator'
    subActionConfig = @_checkConfig config, key, ['string', 'object'], ''
    if subActionConfig is '' or typeof subActionConfig is 'string'
      return subActionConfig
    else
      name = @name + '$' + key
      subActionConfig.name = name
      generator = new ActionGenerator(parent)
      parent.actions[name] = generator.generate(parent, subActionConfig, Object.keys(parent.actions).length)
      return name

module.exports = Action
