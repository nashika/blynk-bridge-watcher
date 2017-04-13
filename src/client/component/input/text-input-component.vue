<template lang="pug">
  b-form-input(type="text", v-model="editEntity[fieldName]", :required="field.required", :disabled="field.disabled", :placeholder="field.default")
</template>

<script lang="ts" src="./text-input-component.ts"></script>
