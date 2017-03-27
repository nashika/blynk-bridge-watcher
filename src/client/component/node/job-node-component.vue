<template lang="pug">
  extends base-node-component

  block body
    button.btn.btn-default.btn-block.btn-sm(type="button", @click="run()", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Run Now
</template>

<style scoped lang="sass">
  @import "./base-node-component.scss"
</style>

<script lang="ts" src="./job-node-component.ts"></script>
