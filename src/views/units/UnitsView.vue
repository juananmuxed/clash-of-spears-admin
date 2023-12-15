<template>
  <GenericViewVue
    :columns="columns"
    :title="$t('common.titles.units', 2)"
    :dialog-title="$t('common.titles.units', 1)"
  />
</template>

<script setup lang="ts">
import { GenericView } from 'src/components/common/GenericView';
import { useUnits } from 'src/composables/client/UseUnits';
import { Unit } from 'src/models/api/Units';
import { GenericViewKey } from 'src/types/Symbols';
import { unitForm, columns } from './TableData'

const units = useUnits();

provide<GenericView<Unit>>(GenericViewKey, {
  tableService: units.getUnitsPaginated,
  createService: units.createUnit,
  updateService: units.updateUnit,
  removeService: units.deleteUnit,
  uploadService: units.postUnitsBulk,
  dialogForm: unitForm,
});

const { GenericViewVue } = GenericView<Unit>();
</script>
