<template lang="pug">
  b-button(:block="true", :disabled="status != 'ready'", size="sm", variant="secondary", @click="send()") Read from {{shortPinType}}{{entity.pin}}
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./read-action-node-content-component.ts"></script>
