<template lang="pug">
  extends base-node-component

  block children
    +children("bridge-node-component", "bridge", "bridges")
</template>

<script lang="ts" src="./board-node-component.ts"></script>
