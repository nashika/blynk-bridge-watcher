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
  type: ''

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    @checkConfig config.type, 'config.type', 'string'
    @type = config.type

  ###*
  # @public
  # @param {Base} caller
  ###
  run: (caller, args...) =>
    @log 'error', "Action.run is abstract function"

module.exports = Action
