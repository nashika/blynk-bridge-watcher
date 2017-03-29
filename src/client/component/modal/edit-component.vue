<template lang="pug">
  b-modal(title="Edit", ref="modal", @ok="ok", @cancel="cancel")
    template(v-if="EntityClass")
      form(@submit.stop.prevent="ok()")
        .form-group(v-for="(field, fieldName) in EntityClass.params.fields")
          template(v-if="!field.hidden")
            label {{_.startCase(fieldName)}}
            template(v-if="field.type == 'text'")
              input.form-control(type="text", v-model="editEntity[fieldName]", :required="field.required", :disabled="field.disabled", :placeholder="field.default")
            template(v-else-if="field.type == 'number'")
              input.form-control(type="number", v-model="editEntity[fieldName]", :required="field.required", :disabled="field.disabled", :placeholder="field.default")
            template(v-else-if="field.type == 'select'")
              select.form-control(v-model="editEntity[fieldName]", :disabled="field.disabled")
                option(v-for="(label, key) in field.options", :value="key") {{label}}
            template(v-else-if="field.type == 'node'")
              select.form-control(v-model="editEntity[fieldName]", :disabled="field.disabled")
                option(v-if="!field.required", :value="undefined") Empty
                option(v-for="(label, _id) in getNodeOptions(field.filter)", :value="_id") {{label}}
</template>

<script lang="ts" src="./edit-component.ts"></script>
