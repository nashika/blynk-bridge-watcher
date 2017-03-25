<template lang="pug">
  extends ../base-node-component

  block body
    button.btn.btn-default.btn-block(type="button", @click="run()", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Log
</template>

<script lang="ts" src="./log-action-node-component.ts"></script>
