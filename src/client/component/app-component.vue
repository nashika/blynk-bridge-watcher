<template lang="pug">
  section.app-component
    template(v-if="server")
      node-component(:entity="server", :depth="0")
    template(v-else)
      p Loading server...
    edit-modal-component(ref="edit")
    logs-modal-component(ref="logs")
</template>

<style scoped lang="scss">
  @import "../scss/lib";

  .node-component-block {
    border-bottom: 1px solid $mono-lighter;
    @include make-row;

    > .header {
      @include make-col-ready;
      @include make-col(2);

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    > .body {
      @include make-col-ready;
      @include make-col(10);

      .datas {
        @include make-row;

        .data {
          @include make-col-ready;
          @include make-col(2);
          border-left: 1px solid $mono-lighter;
          padding: 3px;
        }
      }
    }
  }
</style>

<script lang="ts" src="./app-component.ts"></script>
