Base = require './base'
Board = require './board'
NotifierGenerator = require './notifiers/notifier-generator'
Job = require './job'

class Server extends Base

  ###*
  # @public
  # @type {Object.<Board>}
  ###
  boards: null

  ###*
  # @public
  # @type {Object.<Notifier>}
  ###
  notifiers: null

  ###*
  # @public
  # @type {Object.<Job>}
  ###
  jobs: null

  constructor: (config, logger, index) ->
    super null, config, index, logger
    boards = @_checkConfig config, 'boards', 'array'
    @log 'debug', 'Construct board objects was started.'
    @boards = {}
    i = 0
    for boardConfig in boards
      @boards[boardConfig.name] = new Board(this, boardConfig, i++)
    @log 'debug', 'Construct board objects was finished.'

    notifiers = @_checkConfig config, 'notifiers', 'array'
    @log 'debug', "Construct Notifier objects was started."
    notifierGenerator = new NotifierGenerator(this)
    @notifiers = {}
    i = 0
    for notifierConfig in notifiers
      @notifiers[notifierConfig.name] = notifierGenerator.generate(this, notifierConfig, i++)
    @log 'debug', "Construct Notifier objects was finished."

    jobs = @_checkConfig config, 'jobs', 'array'
    @log 'debug', "Construct Job objects was started."
    @jobs = {}
    i = 0
    for jobConfig in jobs
      @jobs[jobConfig.name] = new Job(this, jobConfig, i++)
    @log 'debug', "Construct Job objects was finished."

module.exports = Server
