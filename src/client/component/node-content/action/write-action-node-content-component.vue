<template lang="pug">
  b-button(:block="true", :disabled="status != 'ready'", size="sm", variant="secondary", @click="send()") Write {{entity.value}} to {{shortPinType}}{{entity.pin}}
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./write-action-node-content-component.ts"></script>
