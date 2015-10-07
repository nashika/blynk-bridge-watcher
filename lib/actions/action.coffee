Base = require '../base'

class Action extends Base

  ###*
  # @override
  ###
  TYPE: 'Action'

  ###*
  # @protected
  # @type {string}
  ###
  action: ''

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    @checkConfig config.action, 'config.action', 'string'
    @action = config.action

  ###*
  # @public
  # @param {Base} caller
  ###
  run: (caller, args...) =>
    @log 'error', "Action.run is abstract function"

module.exports = Action
