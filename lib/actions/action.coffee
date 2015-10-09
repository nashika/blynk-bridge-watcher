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

module.exports = Action
