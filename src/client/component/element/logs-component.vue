<template lang="pug">
  b-modal(:fade="true")
    div(v-if="logs")
      table.table.table-bordered.table-striped.table-condensed
        tr
          th Timestamp
          th Level
          th Message
        tr(v-for="log in logs", :class="{danger: log.level == 'fatal' || log.level == 'error', warning: log.level == 'warn'}")
          td {{log.timestamp}}
          td {{log.level}}
          td {{log.message}}
      pre Page:{{page}} Count:{{count}} Limit:{{limit}}
        nav
      ul.pager
        li.previous(v-if="page * limit < count")
          a.disabled(@click="previous()") Previous
        li.next(v-if="page > 1")
          a(@click="next()") Next
    div(v-else).loading #[i.fa.fa-pulse.fa-spinner] Loading...
</template>

<script lang="ts" src="./logs-component.ts"></script>
