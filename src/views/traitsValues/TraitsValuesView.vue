<template>
  <GenericViewVue
    :columns="columns"
    :title="$t('common.titles.traitsValues', 2)"
    :dialog-title="$t('common.titles.traitsValues', 1)"
  />
</template>

<script setup lang="ts">
import { GenericView } from 'src/components/common/GenericView';
import { TraitValue } from 'src/models/api/Traits';
import { GenericViewKey } from 'src/types/Symbols';
import { traitValueForm, columns } from './TableData'
import { useTraitsValues } from 'src/composables/client/UseTraitsValues';

const traitsValues = useTraitsValues();

provide<GenericView<TraitValue>>(GenericViewKey, {
  tableService: traitsValues.getTraitsValuesPaginated,
  createService: traitsValues.createTraitValue,
  updateService: traitsValues.updateTraitValue,
  removeService: traitsValues.deleteTraitValue,
  uploadService: traitsValues.postTraitsValuesBulk,
  dialogForm: traitValueForm,
});

const { GenericViewVue } = GenericView<TraitValue>();
</script>
