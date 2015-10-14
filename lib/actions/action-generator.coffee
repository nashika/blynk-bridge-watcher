Generator = require '../generator'
ReadAction = require './read-action'
WriteAction = require './write-action'
NotifyAction = require './notify-action'
IfAction = require './if-action'

class ActionGenerator extends Generator

  ###*
  # @override
  ###
  TYPE_TO_CLASS:
    read: ReadAction
    write: WriteAction
    notify: NotifyAction
    if: IfAction

module.exports = ActionGenerator
