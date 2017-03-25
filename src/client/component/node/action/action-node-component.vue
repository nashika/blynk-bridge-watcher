<template lang="pug">
  extends ../base-switch-node-component

  block variables
    -
      var singularName = "action";
      var pluralName = "actions";
      var children = [
      "if",
      "log",
      "notify",
      "read",
      "write",
      ];
</template>

<script lang="ts" src="./action-node-component.ts"></script>
