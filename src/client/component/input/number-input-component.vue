<template lang="pug">
  b-form-input(type="number", v-model="entity[fieldName]", :required="field.required", :disabled="field.disabled", :placeholder="field.default ? String(field.default) : null")
</template>

<script lang="ts" src="./number-input-component.ts"></script>
