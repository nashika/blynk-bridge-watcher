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
  constructor: (parent, config) ->
    super parent, config
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
  _onSend: (messages) =>
    title = if messages.length is 1 then messages[0] else "Receive #{messages.length} messages."
    message = messages.join("\n")
    @_pushbullet.note null, title, message, (err) =>
      if err
        @log 'error', "Send pushbullet note was failed."
      else
        @log 'debug', "Send pushbullet not was succeed."

module.exports = PushbulletNotifier
