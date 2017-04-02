<template lang="pug">
  b-modal(title="Edit", ref="modal", :hide-footer="true", @hidden="hidden()")
    template(v-if="EntityClass")
      form(@submit.stop.prevent="submit")
        .form-group(v-for="(field, fieldName) in EntityClass.params.fields")
          template(v-if="!field.hidden")
            label {{_.startCase(fieldName)}}
            template(v-if="field.type == 'text'")
              b-form-input(type="text", v-model="editEntity[fieldName]", :required="field.required", :disabled="field.disabled", :placeholder="field.default")
            template(v-else-if="field.type == 'number'")
              b-form-input(type="number", v-model="editEntity[fieldName]", :required="field.required", :disabled="field.disabled", :placeholder="field.default ? String(field.default) : null")
            template(v-else-if="field.type == 'select'")
              b-form-select(v-model="editEntity[fieldName]", :options="field.options", :disabled="field.disabled")
            template(v-else-if="field.type == 'node'")
              b-form-select(v-model="editEntity[fieldName]", :options="nodeClientService.getNodeOptions(field.filter)", :disabled="field.disabled")
        .form-group
          button.btn.btn-primary.btn-block(type="submit", ref="submit") Commit
</template>

<script lang="ts" src="./edit-component.ts"></script>
