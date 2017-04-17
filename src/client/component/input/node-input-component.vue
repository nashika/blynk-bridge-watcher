<template lang="pug">
  div
    template(v-for="(valElement, valIndex) in val")
      .row.no-gutters.mb-2
        .col-sm-6: b-form-select.form-control(v-model="valElement.id", :options="options", :disabled="field.disabled")
        .col-sm-6: b-form-input(type="text", v-model="valElement.param")
        .col-sm-4: b-button(:block="true", size="sm", @click.prevent="remove(valIndex)") #[i.fa.fa-trash-o] Remove
        .col-sm-4: b-button(:block="true", size="sm", @click.prevent="move(valIndex, false)") #[i.fa.fa-arrow-up] Up
        .col-sm-4: b-button(:block="true", size="sm", @click.prevent="move(valIndex, true)") #[i.fa.fa-arrow-down]Down
    b-button(:block="true", variant="secondary", @click.prevent="add()") #[i.fa.fa-plus] Add Node
</template>

<script lang="ts" src="./node-input-component.ts"></script>
