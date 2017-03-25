<template lang="pug">
  extends ../base-switch-node-component

  block variables
    -
      var singularName = "notifier";
      var pluralName = "notifiers";
      var children = [
      "log",
      "pushbullet",
      ];
</template>

<script lang="ts" src="./notifier-node-component.ts"></script>
