core = require './core'

class Bridge

  @virtualPinCounter: 1
  config: null
  widgetBridge: null

  constructor: (config) ->
    @config = config
    @widgetBridge = new core.blynk.WidgetBridge(Bridge.virtualPinCounter++)
    @widgetBridge.setAuthToken(@config.token)

module.exports = Bridge
