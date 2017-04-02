<template lang="pug">
  b-button(:block="true", size="sm", variant="secondary", :disabled="status != 'ready'", @click="run()") Test Notify
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./log-notifier-node-content-component.ts"></script>
