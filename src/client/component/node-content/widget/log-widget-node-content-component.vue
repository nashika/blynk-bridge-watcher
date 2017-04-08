<template lang="pug">
  b-button(:block="true", :disabled="status != 'ready'", size="sm", variant="secondary", @click="send()") Log
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./log-widget-node-content-component.ts"></script>
