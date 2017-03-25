<template lang="pug">
  extends ../base-node-component

  block body
    button.btn.btn-default.btn-block(type="button", @click="run()", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Text Notify
</template>

<script lang="ts" src="./log-notifier-node-component.ts"></script>
