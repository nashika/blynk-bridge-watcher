Generator = require '../generator'
ReadAction = require './read-action'
WriteAction = require './write-action'
LogAction = require './log-action'
NotifyAction = require './notify-action'
IfAction = require './if-action'

class ActionGenerator extends Generator

  ###*
  # @override
  ###
  TYPE_TO_CLASS:
    read: ReadAction
    write: WriteAction
    log: LogAction
    notify: NotifyAction
    if: IfAction

module.exports = ActionGenerator
