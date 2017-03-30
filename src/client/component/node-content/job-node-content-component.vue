<template lang="pug">
  button.btn.btn-secondary.btn-block.btn-sm(type="button", @click="run()", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Run Now
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./job-node-content-component.ts"></script>
