<template lang="pug">
  .server-node-content-component
    template(v-if="$parent.status == 'stop'")
      b-button(:block="true", variant="success", size="sm", @click="start()") Start Server
    template(v-else)
      b-button(:block="true", variant="danger", size="sm", @click="stop()") Stop Server
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./server-node-component.ts"></script>
