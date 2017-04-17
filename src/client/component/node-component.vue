<template lang="pug">
  .node-component
    template(v-if="entity.type == 'server'")
      .node
        .data.title Node
        .data.content Content
        .data.log Log
        .data.action Act
    .node
      .data.title
        .header(:style="{paddingLeft: depthPadding(depth) + 'px'}")
          b-tooltip(:content="title", placement="bottom")
            span
              i.fa(:class="'fa-' + EntityClass.params.icon")
              | &nbsp;{{title}}
      .data.content
        component(:is="_.kebabCase((entity.subType || '') + ' ' + this.entity.type) + '-node-content-component'", :entity="entity")
      .data.log(@click="lastLog && logs()")
        b-badge(:variant="logTimer ? 'info' : 'default'") {{lastLog ? lastLog.no : 0}}{{stackLogs.length > 0 ? "+" + stackLogs.length : ""}}
        | &nbsp;{{lastLog ? lastLog.message : ""}}
      .data.action
        b-dropdown(size="sm", :variant="buttonColor", :right="true")
          template(slot="text")
            template(v-if="isRunning")
              i.fa.fa-circle-o-notch.fa-spin
            template(v-else)
              template(v-if="status == 'ready'"): i.fa.fa-toggle-on
              template(v-if="status == 'stop'"): i.fa.fa-toggle-off
              template(v-if="status == 'error'"): i.fa.fa-warning
              template(v-if="status == 'connecting'"): i.fa.fa-spinner.fa-pulse
              template(v-if="status == 'processing'"): i.fa.fa-refresh.fa-spin
          b-dropdown-item(@click="logs()") #[i.fa.fa-terminal] Show Logs
          template(v-if="status == 'stop'")
            b-dropdown-item(@click="edit()") #[i.fa.fa-pencil] Edit
            b-dropdown-item(v-if="parent", @click="remove()") #[i.fa.fa-trash-o] Remove
            b-dropdown-item(v-if="parent && !isFirst", @click="move(false)") #[i.fa.fa-arrow-up] Move Up
            b-dropdown-item(v-if="parent && !isLast", @click="move(true)") #[i.fa.fa-arrow-down] Move Down
    template(v-for="ChildEntityClass in EntityClass.params.children")
      .child-node-components(:class="ChildEntityClass.params.type")
        .node
          .data.title
            .header(:style="{paddingLeft: depthPadding(depth + 0.5) + 'px'}")
              b-badge #[i.fa(:class="'fa-' + ChildEntityClass.params.icon")] {{_.startCase(pluralize.plural(ChildEntityClass.params.type))}}
          .data.content
          .data.log
          .data.action
            b-dropdown(v-if="status == 'stop'", size="sm", :variant="buttonColor", :right="true")
              template(slot="text")
                template(): i.fa.fa-bars
              template(v-if="ChildEntityClass.subClasses")
                template(v-for="ChildSubEntityClass in ChildEntityClass.subClasses")
                  b-dropdown-item(@click="add(ChildSubEntityClass)") #[i.fa.fa-plus] Add {{_.startCase(ChildSubEntityClass.params.subType || "")}}{{_.startCase(ChildSubEntityClass.params.type)}}
              template(v-else)
                b-dropdown-item(@click="add(ChildEntityClass)") #[i.fa.fa-plus] Add {{_.startCase(ChildEntityClass.params.type)}}
        template(v-for="childEntity in getChildEntities(ChildEntityClass)")
          template(v-if="ChildEntityClass.subClasses")
            node-component(:entity="childEntity", :brother-entities="getChildEntities(ChildEntityClass)", :parent="me", :depth="depth + 1")
          template(v-else)
            node-component(:entity="childEntity", :brother-entities="getChildEntities(ChildEntityClass)", :parent="me", :depth="depth + 1")
        template(v-if="!getChildEntities(ChildEntityClass)")
          .node
            .data.title
              .header(:style="{paddingLeft: depthPadding(depth + 1) + 'px'}")
                | #[i.fa.fa-spinner.fa-pulse] Loading {{_.startCase(ChildEntityClass.params.type)}}...
            .data.content
            .data.log
            .data.action
        template(v-if="getChildEntities(ChildEntityClass) && getChildEntities(ChildEntityClass).length == 0")
          .node
            .data.title
              .header(:style="{paddingLeft: depthPadding(depth + 1)+ 'px'}")
                | #[i.fa.fa-ban] No {{_.startCase(ChildEntityClass.params.type)}}
            .data.content
            .data.log
            .data.action
</template>

<style scoped lang="scss">
  @import "../scss/lib";

  $height: 35px;

  .node {
    border-bottom: 1px solid $mono-lighter;
    min-height: $height;
    display: flex;
    align-items: center;

    > .data {
      height: $height;
      border-right: 1px solid $mono-lighter;
      padding: 3px;
      //display: flex;
      //align-items: center;

      &.title {
        flex: 1 1 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &.content {
        flex: 1 1 300px;
        overflow: hidden;
      }

      &.log {
        flex: 1 2 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }

      &.action {
        flex: 0 0 55px;
        justify-content: flex-end;
      }
    }
  }

</style>

<script lang="ts" src="./node-component.ts"></script>
