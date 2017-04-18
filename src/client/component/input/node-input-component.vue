<template lang="pug">
  div
    template(v-for="(valElement, valIndex) in val")
      .row.no-gutters.mb-2
        .col-sm-6: b-form-select.form-control(v-model="valElement.id", :options="options", :disabled="field.disabled")
        .col-sm-6
          template(v-if="!nodeClientService.getComponent(valElement.id)")
            b-form-input(type="text", v-model="valElement.param", :value="valElement.param = null", :disabled="true", placeholder="Not Selected")
          template(v-else-if="nodeClientService.getComponent(valElement.id).EntityClass.params.input == 'null'")
            b-form-input(type="text", v-model="valElement.param", :value="valElement.param = null", :disabled="true", placeholder="No Input")
          template(v-else-if="valElement.output")
            input.form-control(type="text", v-model="valElement.param", :value="valElement.param = null", :disabled="true", placeholder="Use Output")
          template(v-else-if="nodeClientService.getComponent(valElement.id).EntityClass.params.input == 'integer'")
            input.form-control(type="number", v-model="valElement.param", step="1", placeholder="Input integer")
          template(v-else-if="nodeClientService.getComponent(valElement.id).EntityClass.params.input == 'string'")
            b-form-input(type="text", v-model="valElement.param", placeholder="Input string")
        .col-sm-3: b-button(:block="true", size="sm", @click.prevent="remove(valIndex)") #[i.fa.fa-trash-o] Remove
        .col-sm-3: b-button(:block="true", size="sm", @click.prevent="move(valIndex, false)") #[i.fa.fa-arrow-up] Up
        .col-sm-3: b-button(:block="true", size="sm", @click.prevent="move(valIndex, true)") #[i.fa.fa-arrow-down] Down
        .col-sm-3: b-button(:block="true", size="sm", @click.prevent="toggle(valIndex)", :disabled="entity.Class.params.output == 'null'")
          template(v-if="valElement.output") #[i.fa.fa-toggle-on] Output
          template(v-else) #[i.fa.fa-toggle-off] Output
    b-button(:block="true", variant="secondary", @click.prevent="add()") #[i.fa.fa-plus] Add Node
</template>

<script lang="ts" src="./node-input-component.ts"></script>
