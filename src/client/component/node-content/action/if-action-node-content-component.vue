<template lang="pug">
  .row.no-gutter.w-100
    .col-6
      button.btn.btn-secondary.btn-block.btn-sm(type="button", @click="run(true)", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") If
    .col-6
      button.btn.btn-secondary.btn-block.btn-sm(type="button", @click="run(false)", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Else
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./if-action-node-content-component.ts"></script>
