Board = require './Board'

class Server

  ###*
  # @protected
  # @type {Logger}
  ###
  _logger: null

  ###*
  # @protected
  # @type {Object.<Board>}
  ###
  _boards: null

  constructor: (config, logger) ->
    @_logger = logger
    @log 'debug', 'Construct board objects was started.'
    @_boards = {}
    for boardConfig in config.boards
      @_boards[boardConfig.name] = new Board(this, boardConfig)
    @log 'debug', 'Construct board objects was finished.'

    @log 'debug', "Construct Notifier objects was started."
    for notifierConfig in config.notifiers
      a
    @log 'debug', "Construct Notifier objects was finished."

  log: (level, args...) =>
    @_logger.log level, args...

module.exports = Server
