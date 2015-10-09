Generator = require '../generator'
LogNotifier = require './log-notifier'
PushbulletNotifier = require './pushbullet-notifier'

class NotifierGenerator extends Generator

  ###*
  # @override
  ###
  TYPE: 'NotifierGenerator'

  ###*
  # @override
  ###
  TYPE_TO_CLASS:
    log: LogNotifier
    pushbullet: PushbulletNotifier

module.exports = NotifierGenerator
