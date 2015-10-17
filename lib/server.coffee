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

  constructor: (config, logger) ->
    super null, config, logger
    @_initializeChildren config, 'boards', Board
    @_initializeChildrenWithGenerator config, 'notifiers', NotifierGenerator
    @_initializeChildren config, 'jobs', Job

module.exports = Server
