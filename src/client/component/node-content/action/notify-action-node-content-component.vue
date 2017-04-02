<template lang="pug">
  b-button(:block="true", :disabled="status != 'ready'", size="sm", variant="secondary", @click="send()") Notify
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./notify-action-node-content-component.ts"></script>
