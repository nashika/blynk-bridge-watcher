<template lang="pug">
  extends base-node-component

  block children
    +children("action-node-component", "action", "actions")
</template>

<script lang="ts" src="./bridge-node-component.ts"></script>
