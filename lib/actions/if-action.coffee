Action = require './action'

class IfAction extends Action

  ###*
  # @protected
  # @type {string}
  ###
  _operator: ''

  ###*
  # @protected
  # @type {number}
  ###
  _value: -1

  ###*
  # @protected
  # @type {string}
  ###
  _then: ''

  ###*
  # @protected
  # @type {string}
  ###
  _else: ''

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    @_operator = @_checkConfig config, 'operator', 'string'
    @_value = @_checkConfig config, 'value', 'number'
    @_then = @_checkConfig config, 'then', 'string'
    @_else = @_checkConfig config, 'else', 'string'

  ###*
  # @override
  ###
  run: (bridge, args...) =>
    if args.length < 1
      @log 'warn', "If action called no argument."
      return
    arg = parseInt(args[0])
    if isNaN(arg)
      @log 'warn', "If action called not integer argument. arg='#{args[0]}'"
      return
    result = false
    switch @_operator
      when '=', '==' then result = arg == @_value
      when '<' then result = arg < @_value
      when '>' then result = arg > @_value
      when '<=' then result = arg <= @_value
      when '>=' then result = arg >= @_value
      when '!=', '<>' then result = arg != @_value
      else
        @log 'warn', "Operator '#{@_operator}' is invalid."
        return
    @log 'debug', "If action. '(#{arg} #{@_operator} #{@_value}) = #{result}'"
    if result and @_then
      bridge.emit @_then, bridge, args...
    else if not result and @_else
      bridge.emit @_else, bridge, args...

module.exports = IfAction
