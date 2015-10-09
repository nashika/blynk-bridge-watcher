Base = require './base'

class Generator extends Base

  ###*
  # @override
  ###
  TYPE: 'Generator'

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

  generate: (parent, config, index) =>
    type = @_checkConfig config, 'type', 'string'
    if @TYPE_TO_CLASS[type]
      return new @TYPE_TO_CLASS[type](parent, config, index)
    else
      @log 'fatal', "Generator type='#{type}' is not defined."
      process.exit 1

module.exports = Generator
