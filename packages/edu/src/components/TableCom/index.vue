<template>
  <el-table
    v-bind="setTableAttrs($attrs)"
    :data="tableData"
    :cell-style="{ 'align-items': 'center' }"
    :header-row-style="{'height':`${headerHeight}px`}"
    :row-class-name="rowClassName"
    :border="false"
    @row-click="rowClickEvent"
  >
    <template v-slot:empty>
      <div class="no-data">
        <svg-icon icon-class="nodata"></svg-icon>
        <div class="no-data-mess">{{ noDataMess }}</div>
      </div>
    </template>
    <template v-for="column in tableHeader">
      <TableColumn
        :key="column.attrs.prop"
        v-if="!!column.children && !!column.children.length"
        :coloumn-header="column"
      >
        <template #multiple="{scope}">
          <slot name="multiple" :scope="scope"></slot>
        </template>
      </TableColumn>
      <template v-else>
        <el-table-column
          :key="column.attrs.prop"
          v-if="column.attrs.type === 'selection'"
          v-bind="setColumnAttrs(column.attrs)"
        ></el-table-column>
        <el-table-column
          :key="column.attrs.prop"
          v-else-if="column.attrs.type === 'fixed'"
          v-bind="setColumnAttrs(column.attrs)"
        ></el-table-column>
        <el-table-column
          :key="column.attrs.prop"
          v-else
          v-bind="setColumnAttrs(column.attrs)"
        >
          <template v-slot:header="scope">
            <template v-if="column.customHeader">
              <slot :name="`${column.attrs.prop}Header`" :scope="scope"></slot>
            </template>
            <template v-else>
              <span>{{ column.attrs.label }}</span>
            </template>
          </template>
          <template v-slot="scope">
            <template v-if="column.custom === true">
              <slot :name="column.attrs.prop" :scope="scope"></slot>
            </template>
            <template v-else>{{ scope.row[column.attrs.prop] }}</template>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
</template>
<script>
import TableColumn from "./TableColumn"
/*
  [
  { attrs: { prop: '', label: '', type: 'selection', width: '50', align: 'center' } },
  { attrs: { prop: 'number', label: '采购包编号' } },
  { attrs: { prop: 'name', label: '采购包名称' } },
  { attrs: { prop: 'desc', label: '采购包概述' } },
  { attrs: { prop: 'user', label: '发起人' } },
  { attrs: { prop: 'createTime', label: '生成时间' } },
  { attrs: { prop: 'modifyTime', label: '变更时间' } },
  { attrs: { prop: 'status', label: '采购包状态' } },
  { attrs: { prop: 'coop', label: '操作' }, custom: true },
  { attrs: { label: '单项控制价', prop: 'mControl' }, custom: true },
  {
    attrs: { prop: 'test', label: 'test' },
    children: [
      {
        attrs: { prop: 'test1', label: 'test1' },
        children: [
          { attrs: { prop: 'test2', label: 'test2' }, custom: true }
        ]
      }
    ]
  }
]
*/
import { computed, onMounted } from "vue"

export default {
  name: "TableCom",
  components: {
    TableColumn
  },
  props: {
    // table数据 还是 显示 的 声明 必填性
    tableData: {
      type: Array,
      required: true
    },
    // table 表头数据
    tableHeader: {
      type: Array,
      required: true
    },
    noDataMess: {
      type: String,
      default () {
        return "暂无数据"
      }
    },
    rowClick: {
      type: Boolean,
      default: false
    },
    headerHeight: {
      type: Number,
      default: 68
    }
  },
  setup (props, { emit }) {
    return {
      setColumnAttrs: computed(() => attrs =>
        Object.assign({}, { width: "auto", align: "center" }, attrs)
      ),
      setTableAttrs: computed(() => attrs =>
        Object.assign(
          {},
          { ref: "tableRef", border: true, style: { width: "100%" } },
          attrs
        )
      ),
      rowClassName: ({ row, rowIndex: index }) =>
        index % 2 ? "" : "stripe-row",
      rowClickEvent: row => {
        emit("rowClickEvent", row)
      }
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
:deep .el-table__header tr .cell,
.el-table__header th .cell {
  opacity: 0.6;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #222222;
}
// ::v-deep .el-table__body-wrapper.is-scrolling-none {
//   background: #000;
// }
// ::v-deep .el-checkbox__input.is-disabled .el-checkbox__inner {
//   background-color: #6b6d6f;
// }
// ::v-deep .el-table__header-wrapper,
// .el-table__footer-wrapper {
//   background: #000;
// }

.el-table th,
.el-table tr {
  border-radius: 4px;
  overflow: hidden;
}
.el-table {
  border: none;
}

::v-deep {
  .stripe-row {
    background: #f6f5f6;
  }
  // .el-table__row {
  //   &:hover {
  //     background-color: #3a6fd9;
  //   }
  // }
}

.el-table th,
.el-table td,
.el-table th.is-leaf {
  border: none;
}

.el-table th,
.el-table td {
  padding: 0;
  height: 56px;
  line-height: 56px;
}

.el-table th {
  padding: 0;
  height: 68px;
  line-height: 68px;
}

.el-table::after {
  width: 0;
}
.el-table::before {
  height: 0;
}
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  .svg-icon {
    width: 100px;
    height: 100px;
  }
  .no-data-mess {
    color: #979fc2;
  }
}
</style>
