<template lang="pug">
  extends ../base-node-component

  block body
    button.btn.btn-default.btn-block(type="button", @click="run()", :class="{disabled: status != 'ready'}", :disabled="status != 'ready'") Read from {{shortPinType}}{{entity.pin}}
</template>

<script lang="ts" src="./read-action-node-component.ts"></script>
