<template lang="pug">
  button.btn.btn-secondary.btn-block.btn-sm(type="button", @click="run()", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Log
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./log-action-node-content-component.ts"></script>
