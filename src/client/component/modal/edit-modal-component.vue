<template lang="pug">
  b-modal(title="Edit", ref="modal", :hide-footer="true", @hidden="hidden()")
    template(v-if="EntityClass")
      form(@submit.stop.prevent="submit")
        template(v-for="(field, fieldName) in EntityClass.params.fields")
          template(v-if="!field.hidden")
            .form-group
              label {{_.startCase(fieldName)}}
              component(:is="field.type + '-input-component'", :entity="entity", :fieldName="fieldName", :field="field")
        .form-group
          button.btn.btn-primary.btn-block(type="submit", ref="submit") Commit
</template>

<script lang="ts" src="./edit-modal-component.ts"></script>
