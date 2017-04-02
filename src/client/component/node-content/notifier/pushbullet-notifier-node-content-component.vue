<template lang="pug">
  b-button(:block="true", :disabled="status != 'ready'", size="sm", variant="secondary", @click="send()") Test Notify
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./pushbullet-notifier-node-content-component.ts"></script>
