<template lang="pug">
  button.btn.btn-secondary.btn-block.btn-sm(type="button", @click="run()", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Read from {{shortPinType}}{{entity.pin}}
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./read-action-node-content-component.ts"></script>
