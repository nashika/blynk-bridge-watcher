<template lang="pug">
  b-button(size="sm", :block="true", variant="secondary", @click="run()", :disabled="status != 'ready'") Run Now
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./job-node-content-component.ts"></script>
