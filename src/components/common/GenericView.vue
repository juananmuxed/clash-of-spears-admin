<template>
  <QTable
    v-model:pagination="pagination"
    class="q-ma-lg"
    :loading="scope?.tableService.isFetching"
    :rows="scope?.tableService.data"
    @request="(request) => loadService(request.pagination)"
  />
</template>

<script setup lang="ts">
import { defaultListPaginatedResponseData } from "src/data/default/FetchResponse";
import { Pagination } from "src/models/fetch/Pagination";
import { GenericViewKey } from "src/types/Symbols";
import { inject } from "vue";

const scope = inject(GenericViewKey);

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
