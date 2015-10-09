Pushbullet = require 'pushbullet'

Notifier = require './notifier'

class PushbulletNotifier extends Notifier

  ###*
  # @protected
  # @type Pushbullet
  ###
  _pushbullet: null

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    apiKey = @_checkConfig config, 'apiKey', 'string'
    @_pushbullet = new Pushbullet(config.apiKey)
    @_pushbullet.me (err, response) =>
      if err
        @log 'fatal', 'Pushbullet auth failed.'
        process.exit 1
      else
        @log 'info', "Pushbullet auth succeed. response=#{JSON.stringify(response)}"

  ###*
  # @override
  ###
  _onNotify: (options, args...) =>
    message = @_makeMessage(options, args...)
    @_pushbullet.note null, message, message, (err) =>

module.exports = PushbulletNotifier
