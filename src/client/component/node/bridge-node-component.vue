<template lang="pug">
  extends base-node-component

  block children
    +children("action-node-component", "action", "actions")
</template>

<style scoped lang="sass">
  @import "./base-node-component.scss"
</style>

<script lang="ts" src="./bridge-node-component.ts"></script>
