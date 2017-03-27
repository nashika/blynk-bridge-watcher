<template lang="pug">
  extends ../base-node-component

  block body
    button.btn.btn-default.btn-block.btn-sm(type="button", @click="run()", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Notify
</template>

<style scoped lang="scss">
  @import "../base-node-component.scss";
</style>

<script lang="ts" src="./notify-action-node-component.ts"></script>
