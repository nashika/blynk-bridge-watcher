<template lang="pug">
  extends base-node-component

  block children
    +children("bridge-node-component", "bridge", "bridges")
</template>

<style scoped lang="sass">
  @import "./base-node-component.scss"
</style>

<script lang="ts" src="./board-node-component.ts"></script>
