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
    @checkConfig config.action, 'config.action', 'string'
    switch config.action
      when '$notify'
        return new NotifyAction(parent, config, index)
      else
        if config.action.match(/$\$/)
          @log 'fatal', "Action '#{config.action}' is not defined built-in action."
          process.exit 1
        else
          return new CustomAction(parent, config, index)

module.exports = ActionGenerator
