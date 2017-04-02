<template lang="pug">
  b-button(:block="true", :disabled="status != 'ready'", size="sm", variant="secondary", @click="send()") Run Now
</template>

<style scoped lang="scss">
</style>

<script lang="ts" src="./job-node-content-component.ts"></script>
