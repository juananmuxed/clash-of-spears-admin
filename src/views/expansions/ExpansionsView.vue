<template>
  <GenericViewVue
    :columns="columns"
    :title="$t('common.titles.expansions', 2)"
    :dialog-title="$t('common.titles.expansions', 1)"
  />
</template>

<script setup lang="ts">
import { GenericView } from 'src/components/common/GenericView';
import { useExpansions } from 'src/composables/client/UseExpansions';
import { Expansion } from 'src/models/api/Expansions';
import { GenericViewKey } from 'src/types/Symbols';
import { expansionForm, columns } from './TableData'

const expansions = useExpansions();

provide<GenericView<Expansion>>(GenericViewKey, {
  tableService: expansions.getExpansionsPaginated,
  createService: expansions.createExpansion,
  updateService: expansions.updateExpansion,
  removeService: expansions.deleteExpansion,
  uploadService: expansions.postExpansionsBulk,
  dialogForm: expansionForm,
});

const { GenericViewVue } = GenericView<Expansion>();
</script>
