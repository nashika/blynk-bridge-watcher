<template lang="pug">
  extends base-node-component

  block children
    +children("board-node-component", "board", "boards")
    +children("notifier-node-component", "notifier", "notifiers")
    +children("job-node-component", "job", "jobs")
</template>

<style scoped lang="sass">
  @import "./base-node-component.scss"
</style>

<script lang="ts" src="./server-node-component.ts"></script>
