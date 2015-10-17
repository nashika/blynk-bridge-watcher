Base = require './base'

class Generator extends Base

  ###*
  # @const
  # @type {Object}
  ###
  TYPE_TO_CLASS: {}

  ###*
  # @override
  ###
  constructor: (parent) ->
    config =
      name: 'generator'
    super parent, config, -1

  generate: (parent, config) =>
    type = @_checkConfig config, 'type', 'string'
    if @TYPE_TO_CLASS[type]
      return new @TYPE_TO_CLASS[type](parent, config)
    else
      @log 'fatal', "Generator type='#{type}' is not defined."
      process.exit 1

module.exports = Generator
