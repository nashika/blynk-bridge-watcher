Generator = require '../generator'
NotifyAction = require './notify-action'
CustomAction = require './custom-action'

class ActionGenerator extends Generator

  ###*
  # @override
  ###
  TYPE: 'ActionGenerator'

  ###*
  # @override
  ###
  TYPE_TO_CLASS:
    notify: NotifyAction
    custom: CustomAction

module.exports = ActionGenerator
