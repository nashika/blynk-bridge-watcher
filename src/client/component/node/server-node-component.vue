<template lang="pug">
  extends base-node-component

  block children
    +children("board-node-component", "board", "boards")
    +children("notifier-node-component", "notifier", "notifiers")
    +children("job-node-component", "job", "jobs")
</template>

<script lang="ts" src="./server-node-component.ts"></script>
