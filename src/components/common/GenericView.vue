<template>
  <QCard class="q-ma-lg">
  <QCardSection class="bg-secondary text-white">
    <div class="text-h5">{{ $t($route.meta.titleTag) }}</div>
  </QCardSection>
    <QCardSection>
      <QTable
        v-model:pagination="pagination"
        binary-state-sort
        row-key="id"
        flat
        :columns="columns"
        :loading="scope?.tableService.isFetching"
        :rows="scope?.tableService.data"
        :rows-per-page-options="[5, 10, 15, 20, 50]"
        @request="(request) => loadService(request.pagination)"
      >
        <template #body-cell="props">
          <template v-if="utilIs.array(props.value)">
            <QTd>
              <QChip
                v-for="item in props.value"
                :label="item.name"
                color="secondary"
                text-color="white"
                size="sm"
              ></QChip>
            </QTd>
          </template>
          <template v-else>
            <QTd>
              {{ props.value }}
            </QTd>
          </template>
        </template>

        <template #body-cell-options="props">
          <QTd class="center q-gutter-sm">
            <QBtn  round unelevated dense color="primary" >
              <QIcon name="fas fa-pen-to-square" size="xs"/>
              <QTooltip>{{ $t('common.labels.edit') }}</QTooltip>
            </QBtn>
            <QBtn  round unelevated dense color="negative" >
              <QIcon name="fas fa-trash" size="xs"/>
              <QTooltip>{{ $t('common.labels.remove') }}</QTooltip>
            </QBtn>
          </QTd>
        </template>
      </QTable>
    </QCardSection>
    <QCardActions align="right">
      <QBtn
        :label="$t('common.buttons.add')"
        rounded
        color="positive"
        unelevated
        padding="sm xl"
      />
    </QCardActions>
  </QCard>
</template>

<script setup lang="ts">
import { QTableColumn } from "quasar";
import { defaultListPaginatedResponseData } from "src/data/default/FetchResponse";
import { Pagination } from "src/models/fetch/Pagination";
import { GenericViewKey } from "src/types/Symbols";
import { is } from "src/utils/Is";
import { PropType } from "vue";

const utilIs = is();

const scope = inject(GenericViewKey);
defineProps({
  columns: { type: Object as PropType<QTableColumn[]>, required: true },
});

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
