<template lang="pug">
  b-modal(ref="modal", title="Logs", size="lg", :fade="true")
    div(v-if="logs")
      table.table.table-bordered.table-striped.table-sm
        thead
          tr
            th Timestamp
            th Level
            th Message
        tbody
          tr(v-for="log in logs", :class="{'table-danger': log.level == 'fatal' || log.level == 'error', 'table-warning': log.level == 'warn'}")
            td {{moment(log.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS')}}
            td {{log.level}}
            td {{log.message}}
      pre Page:{{page}} Now:{{(page - 1) * limit + 1}}-{{page * limit > lastLog.no ? lastLog.no : page * limit}} Count:{{lastLog.no}}
      b-pagination(size="md", v-model="page", :total-rows="lastLog.no", :per-page="limit", @input="changePage($event)")
    div(v-else).loading #[i.fa.fa-pulse.fa-spinner] Loading...
</template>

<script lang="ts" src="./logs-component.ts"></script>
