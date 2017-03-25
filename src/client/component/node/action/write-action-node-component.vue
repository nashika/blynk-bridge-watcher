<template lang="pug">
  extends ../base-node-component

  block body
    button.btn.btn-default.btn-block(type="button", @click="run()", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Write {{entity.value}} to {{shortPinType}}{{entity.pin}}
</template>

<style scoped lang="sass">
  @import "../base-node-component.scss"
</style>

<script lang="ts" src="./write-action-node-component.ts"></script>
