<template lang="pug">
  extends ../base-node-component.pug

  block body
    .row
      .col-xs-6(style="padding: 0 5px 0 15px")
        button.btn.btn-default.btn-block.btn-sm(type="button", @click="run(true)", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") If
      .col-xs-6(style="padding: 0 15px 0 5px")
        button.btn.btn-default.btn-block.btn-sm(type="button", @click="run(false)", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Else
</template>

<style scoped lang="scss">
  @import "../base-node-component.scss"
</style>

<script lang="ts" src="./if-action-node-component.ts"></script>
