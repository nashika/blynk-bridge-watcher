<template lang="pug">
  b-form-select(v-model="editEntity[fieldName]", :options="nodeClientService.getNodeOptions(field.filter)", :disabled="field.disabled")
</template>

<script lang="ts" src="./node-input-component.ts"></script>
