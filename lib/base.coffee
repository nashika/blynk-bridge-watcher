EventEmitter = require 'events'

dot = require 'dot-object'

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
    @_logger = @_parent?._logger ? logger
    @name = @_checkConfig config, 'name', 'string'
    @log 'trace', "Constructing #{@constructor.name} object."

  log: (level, args...) =>
    if @_parent
      @_logger.log level, @_allKeyLabel(), args...
    else
      @_logger.log level, args...

  _checkConfig: (config, key, type, defaultValue = undefined) =>
    if (typeof config isnt 'object') or Array.isArray(config)
      @log 'fatal', @_allKeyLabel(), "Check config. 'config' is not object."
      process.exit 1
    target = dot.pick(key, config)
    if typeof target is 'undefined'
      if defaultValue isnt undefined
        return defaultValue
      else
        @log 'fatal', @_allKeyLabel(), "Check config. 'config.#{key}' is undefined."
        process.exit 1
    if (if type is 'array' then not Array.isArray(target) else not (typeof target is type))
      @log 'fatal', @_allKeyLabel(), "Check config. 'config.#{key}' type=#{typeof target} is unexpected, expects #{type}."
      process.exit 1
    return target

  _keyLabel: =>
    if @index >= 0
      return "[#{@TYPE}(#{@index}-#{@name})]"
    else
      return "[#{@TYPE}]"

  _allKeyLabel: (args...) =>
    if @_parent
      return @_parent._allKeyLabel(@_keyLabel(), args...)
    else
      return args.join(' ')

module.exports = Base
