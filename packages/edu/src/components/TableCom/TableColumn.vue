<template>
  <el-table-column v-bind="setColumnAttrs(coloumnHeader.attrs)">
    <template v-for="column in coloumnHeader.children">
      <tableColumn
        v-if="!!column.children && !!column.children.length"
        :key="column.prop"
        :coloumn-header="column"
      >
        <template #multiple="{scope}">
          <slot name="multiple" :scope="scope"></slot>
        </template>
      </tableColumn>
      <template v-else>
        <el-table-column
          :key="column.attrs.prop"
          v-bind="setColumnAttrs(column.attrs)"
        >
          <template #header="scope">
            <template v-if="column.customHeader">
              <slot :name="`${column.attrs.prop}Header`" :scope="scope"></slot>
            </template>
            <template v-else>
              <span>{{ column.attrs.label }}</span>
            </template>
          </template>
          <template #default="scope">
            <template v-if="column.custom === true">
              <slot name="multiple" :scope="scope"></slot>
            </template>
            <template v-else>
              {{ scope.scope.row[column.attrs.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import { computed } from "vue"

export default {
  name: "tableColumn",
  props: {
    coloumnHeader: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    return {
      setColumnAttrs: computed(() => attrs =>
        Object.assign({}, { align: "right" }, attrs)
      )
    }
  }
}
</script>

<style lan="scss" scoped>
.stripe-row {
  background: #f6f5f6;
}
</style>
