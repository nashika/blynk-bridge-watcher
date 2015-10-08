Base = require '../base'
NotifyAction = require './notify-action'
CustomAction = require './custom-action'

class ActionGenerator extends Base

  ###*
  # @override
  ###
  TYPE: 'ActionGenerator'

  constructor: (parent) ->
    config =
      name: 'generator'
    super parent, config, -1

  generate: (parent, config, index) =>
    @checkConfig config.type, 'config.type', 'string'
    switch config.type
      when 'notify'
        return new NotifyAction(parent, config, index)
      else
        @log 'fatal', "Action type '#{config.type}' is not defined."
        process.exit 1

module.exports = ActionGenerator
