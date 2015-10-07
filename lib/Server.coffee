Base = require './Base'
Board = require './Board'
Notifier = require './notifiers/Notifier'

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
    @_notifiers = {}
    i = 0
    for notifierConfig in config.notifiers
      @_notifiers[notifierConfig.name] = new Notifier(this, notifierConfig, i++)
    @log 'debug', "Construct Notifier objects was finished."

  notify: (event, args...) =>
    if @_notifiers[event.notifier]
      @_notifiers[event.notifier].emit 'notify', event.notifier, args...

module.exports = Server
