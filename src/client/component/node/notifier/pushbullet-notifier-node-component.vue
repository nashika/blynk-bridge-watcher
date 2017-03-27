<template lang="pug">
  extends ../base-node-component

  block body
    button.btn.btn-secondary.btn-block.btn-sm(type="button", @click="run()", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Test Notify
</template>

<style scoped lang="scss">
  @import "../base-node-component.scss";
</style>

<script lang="ts" src="./pushbullet-notifier-node-component.ts"></script>
