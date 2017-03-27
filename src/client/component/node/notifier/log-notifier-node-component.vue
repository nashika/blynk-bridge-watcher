<template lang="pug">
  extends ../base-node-component.pug

  block body
    button.btn.btn-default.btn-block(type="button", @click="run()", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Text Notify
</template>

<style scoped lang="sass">
  @import "../base-node-component.scss"
</style>

<script lang="ts" src="./log-notifier-node-component.ts"></script>
