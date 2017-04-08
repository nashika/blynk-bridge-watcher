<template lang="pug">
  .row.no-gutter.w-100
    .col-6
      b-button(:block="true", :disabled="status != 'ready'", size="sm", variant="secondary", @click="send('if')") If
    .col-6
      b-button(:block="true", :disabled="status != 'ready'", size="sm", variant="secondary", @click="send('else')") Else
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./if-widget-node-content-component.ts"></script>
