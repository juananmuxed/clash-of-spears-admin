<template>
  <GenericViewVue
    :columns="columns"
    :title="$t('common.titles.armies', 2)"
    :dialog-title="$t('common.titles.armies', 1)"
  />
</template>

<script setup lang="ts">
import { GenericView } from 'src/components/common/GenericView';
import { useArmies } from 'src/composables/client/UseArmies';
import { Army } from 'src/models/api/Armies';
import { GenericViewKey } from 'src/types/Symbols';
import { armyForm, columns } from './TableData';

const armies = useArmies();

provide<GenericView<Army>>(GenericViewKey, {
  tableService: armies.getArmiesPaginated,
  createService: armies.createArmy,
  updateService: armies.updateArmy,
  removeService: armies.deleteArmy,
  uploadService: armies.postArmiesBulk,
  dialogForm: armyForm,
});

const { GenericViewVue } = GenericView<Army>();
</script>
