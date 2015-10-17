CronJob = require('cron').CronJob

Base = require './base'

class Job extends Base

  ###*
  # @protected
  # @type {string}
  ###
  _cronTime: ''

  ###*
  # @protected
  # @type {Bridge}
  ###
  _bridge: ''

  ###*
  # @protected
  # @type {string}
  ###
  _action: ''

  ###*
  # @protected
  # @type {CronJob}
  ###
  _cronJob: null

  ###*
  # @override
  ###
  constructor: (server, config) ->
    super server, config
    @_cronTime = @_checkConfig config, 'cronTime', 'string'
    boardName = @_checkConfig config, 'board', 'string'
    if not board = @parent.boards[boardName]
      @log 'fatal', "Board '#{boardName}' was not found."
      process.exit 1
    bridgeName = @_checkConfig config, 'bridge', 'string'
    if not @_bridge = board.bridges[bridgeName]
      @log 'fatal', "Board '#{boardName}' -> Bridge '#{bridgeName}' was not found."
      process.exit 1
    @_action = @_checkConfig config, 'action', 'string'
    if not @_bridge.actions[@_action]
      @log 'fatal', "Board '#{boardName}' -> Bridge '#{bridgeName}' -> Action '#{@_action}' was not found."
      process.exit 1
    try
      @_cronJob = new CronJob @_cronTime, @_run
    catch e
      @log 'fatal', "cronTime '#{@_cronTime}' is invalid format."
      process.exit 1
    @_cronJob.start()

  ###*
  # @protected
  ###
  _run: =>
    @log 'debug', "Job '#{@name}' was kicked."
    @_bridge.emit @_action, @_bridge

module.exports = Job
