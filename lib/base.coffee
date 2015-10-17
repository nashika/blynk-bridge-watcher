EventEmitter = require 'events'

dot = require 'dot-object'

class Base extends EventEmitter

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
  # @public
  # @type {Base}
  ###
  parent: null

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
    @parent = parent
    @index = index
    @_logger = @parent?._logger ? logger
    @name = @_checkConfig config, 'name', 'string'
    @log 'trace', "Constructing #{@constructor.name} object."

  log: (level, args...) =>
    if @parent
      @_logger.log level, @allKeyLabel(), args...
    else
      @_logger.log level, args...

  ###*
  # @protected
  # @return {string}
  ###
  allKeyLabel: (args...) =>
    if @parent
      return @parent.allKeyLabel(@_keyLabel(), args...)
    else
      return args.join(' ')

  ###*
  # Check config object and return picked element.
  #
  # @protected
  # @param {Object} config
  # @param {string} key
  # @param {string|Array.<string>} types
  # @param {*} defaultValue
  # @return {*} picked config
  ###
  _checkConfig: (config, key, types, defaultValue = undefined) =>
    if (typeof config isnt 'object') or Array.isArray(config)
      @log 'fatal', @allKeyLabel(), "Check config. 'config' is not object."
      process.exit 1
    target = dot.pick(key, config)

    if typeof target is 'undefined'
      if defaultValue isnt undefined
        return defaultValue
      else
        @log 'fatal', @allKeyLabel(), "Check config. 'config.#{key}' is undefined."
        process.exit 1

    types = [types] if typeof types is 'string'
    if types[0] is 'in'
      types.shift()
      for type in types
        if target is type then return target
      @log 'fatal', @allKeyLabel(), "Check config. 'config.#{key}' value=#{target} is unexpected, expects #{JSON.stringify(types)}."
    else
      for type in types
        if type is 'array'
          if Array.isArray(target) then return target
        else
          if typeof target is type then return target
      @log 'fatal', @allKeyLabel(), "Check config. 'config.#{key}' type=#{typeof target} is unexpected, expects #{JSON.stringify(types)}."
    process.exit 1

  ###*
  # @protected
  #
  ###
  _initializeChildren: (config, key, ChildClass)=>
    childrenConfig = @_checkConfig config, key, 'array'
    @log 'debug', "Construct child '#{key}' objects was started."
    @[key] = {}
    for childConfig in childrenConfig
      @[key][childConfig.name] = new ChildClass(this, childConfig, Object.keys(@[key]).length)
    @log 'debug', "Construct child '#{key}' objects was finished."

  _initializeChildrenWithGenerator: (config, key, ChildGenerator) =>
    childrenConfig = @_checkConfig config, key, 'array'
    @log 'debug', "Construct child '#{key}' objects was started."
    @[key] = {}
    generator = new ChildGenerator(this)
    for childConfig in childrenConfig
      @[key][childConfig.name] = generator.generate(this, childConfig, Object.keys(@[key]).length)
    @log 'debug', "Construct child '#{key}' objects was finished."

  ###*
  # @protected
  # @return {string}
  ###
  _keyLabel: =>
    if @index >= 0
      return "[#{@constructor.name}(#{@index}-#{@name})]"
    else
      return "[#{@constructor.name}]"

module.exports = Base
