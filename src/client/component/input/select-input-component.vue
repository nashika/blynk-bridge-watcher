<template lang="pug">
  b-form-select(v-model="entity[fieldName]", :options="field.options", :disabled="field.disabled")
</template>

<script lang="ts" src="./select-input-component.ts"></script>
