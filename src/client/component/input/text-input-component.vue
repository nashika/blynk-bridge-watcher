<template lang="pug">
  b-form-input(type="text", v-model="val", :required="field.required", :disabled="field.disabled", :placeholder="field.default")
</template>

<script lang="ts" src="./text-input-component.ts"></script>
