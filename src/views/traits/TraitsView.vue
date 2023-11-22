<template>
  <GenericViewVue
    :columns="columns"
    :title="$t('common.titles.traits', 2)"
    :dialog-title="$t('common.titles.traits', 1)"
  />
</template>

<script setup lang="ts">
import { GenericView } from 'src/components/common/GenericView';
import { useTraits } from 'src/composables/client/UseTraits';
import { Trait } from 'src/models/api/Traits';
import { GenericViewKey } from 'src/types/Symbols';
import { traitForm, columns } from './TableData'

const traits = useTraits();

provide<GenericView<Trait>>(GenericViewKey, {
  tableService: traits.getTraitsPaginated,
  createService: traits.createTrait,
  updateService: traits.updateTrait,
  removeService: traits.deleteTrait,
  uploadService: traits.postTraitsBulk,
  dialogForm: traitForm,
});

const { GenericViewVue } = GenericView<Trait>();
</script>
