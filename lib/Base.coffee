EventEmitter = require 'events'

class Base extends EventEmitter

  ###*
  # @const
  # @type {string}
  ###
  TYPE: 'Base'

  ###*
  # @public
  # @type {number}
  ###
  index: -1

  ###*
  # @protected
  # @type {string}
  ###
  name: ''

  ###*
  # @protected
  # @type {Base}
  ###
  _parent: null

  ###*
  # @protected
  # @type {Logger}
  ###
  _logger: null

  ###*
  # @constructor
  # @param {Base} parent
  # @param {Object} config
  # @param {number} vPin
  # @param {Logger} logger
  ###
  constructor: (parent, config, index, logger) ->
    @_parent = parent
    @index = index
    @_logger = logger
    @checkConfig config, 'config', 'object'
    @checkConfig config.name, 'config.name', 'string'
    @name = config.name
    @log 'trace', "Constructing #{@constructor.name} object."

  log: (level, args...) =>
    if @_parent
      @_parent.log level, @_keyLabel(), args...
    else
      @_logger.log level, args...

  checkConfig: (config, key, type, args...) =>
    if @_parent
      @_parent.checkConfig config, key, type, @_keyLabel(), args...
    else
      if typeof config is 'undefined'
        @log 'fatal', args..., "Config '#{key}' is undefined."
        process.exit 1
      if (if type is 'array' then not Array.isArray(config) else not (typeof config is type))
        @log 'fatal', args..., "Config '#{key}' is unexpected type, expects #{type}."
        process.exit 1

  _keyLabel: =>
    if @index >= 0
      return "[#{@TYPE}(#{@index}-#{@name})]"
    else
      return "[#{@TYPE}]"

module.exports = Base
