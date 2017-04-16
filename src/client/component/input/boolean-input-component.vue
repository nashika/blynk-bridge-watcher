<template lang="pug">
  .form-control-static
    b-form-checkbox(v-model="val", :disabled="field.disabled")
</template>

<script lang="ts" src="./boolean-input-component.ts"></script>
