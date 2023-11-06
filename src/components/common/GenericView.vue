<template>
  <div>
    <QTable
      v-model:pagination="pagination"
      class="q-ma-lg"
      binary-state-sort
      row-key="id"
      :columns="columns"
      :loading="scope?.tableService.isFetching"
      :rows="scope?.tableService.data"
      @request="(request) => loadService(request.pagination)"
    >
      <template #body-cell="props">
        <template v-if="utilIs.array(props.value)">
          <QTd :props="props">
            <QChip v-for="item in props.value" :label="item.name" color="primary" size="sm"></QChip>
          </QTd>
        </template>
        <template v-else>
          <QTd>
            {{ props.value }}
          </QTd>
        </template>
      </template>
    </QTable>
  </div>
</template>

<script setup lang="ts">
import { QTableColumn } from "quasar";
import { defaultListPaginatedResponseData } from "src/data/default/FetchResponse";
import { Pagination } from "src/models/fetch/Pagination";
import { GenericViewKey } from "src/types/Symbols";
import { is } from "src/utils/Is";
import { PropType } from "vue";

const utilIs = is()

const scope = inject(GenericViewKey);
defineProps({
  columns: { type: Object as PropType<QTableColumn[]>, required: true },
})

const pagination = computed({
  get() {
    return scope?.tableService.pagination || defaultListPaginatedResponseData();
  },
  set(pagination) {
    if (scope) scope.tableService.pagination = pagination;
  },
});

function loadService(pagination?: Pagination) {
  scope?.tableService.execute(pagination || scope.tableService.pagination);
}

loadService();
</script>
