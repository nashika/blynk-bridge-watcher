Generator = require '../generator'
ReadAction = require './read-action'
NotifyAction = require './notify-action'
CustomAction = require './custom-action'

class ActionGenerator extends Generator

  ###*
  # @override
  ###
  TYPE_TO_CLASS:
    read: ReadAction
    notify: NotifyAction
    custom: CustomAction

module.exports = ActionGenerator
