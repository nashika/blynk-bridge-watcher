Base = require './base'
Board = require './board'
NotifierGenerator = require './notifiers/notifier-generator'

class Server extends Base

  ###*
  # @override
  ###
  TYPE: 'Server'

  ###*
  # @protected
  # @type {Object.<Board>}
  ###
  _boards: null

  ###*
  # @protected
  # @type {Object.<Notifier>}
  ###
  _notifiers: null

  constructor: (config, logger, index) ->
    super null, config, index, logger
    @checkConfig config.boards, 'config.boards', 'array'
    @log 'debug', 'Construct board objects was started.'
    @_boards = {}
    i = 0
    for boardConfig in config.boards
      @_boards[boardConfig.name] = new Board(this, boardConfig, i++)
    @log 'debug', 'Construct board objects was finished.'

    @checkConfig config.notifiers, 'config.notifiers', 'array'
    @log 'debug', "Construct Notifier objects was started."
    notifierGenerator = new NotifierGenerator(this)
    @_notifiers = {}
    i = 0
    for notifierConfig in config.notifiers
      @_notifiers[notifierConfig.name] = notifierGenerator.generate(this, notifierConfig, i++)
    @log 'debug', "Construct Notifier objects was finished."

  notify: (action, args...) =>
    if @_notifiers[action.notifier]
      @_notifiers[action.notifier].emit 'notify', action, args...

module.exports = Server
