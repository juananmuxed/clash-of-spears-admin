<template>
  <GenericViewVue
    :columns="columns"
    :title="$t('common.titles.options', 2)"
    :dialog-title="$t('common.titles.options', 1)"
  />
</template>

<script setup lang="ts">
import { GenericView } from 'src/components/common/GenericView';
import { useOptions } from 'src/composables/client/UseOptions';
import { Option } from 'src/models/api/Options';
import { GenericViewKey } from 'src/types/Symbols';
import { optionForm, columns } from './TableData'

const options = useOptions();

provide<GenericView<Option>>(GenericViewKey, {
  tableService: options.getOptionsPaginated,
  createService: options.createOption,
  updateService: options.updateOption,
  removeService: options.deleteOption,
  uploadService: options.postOptionsBulk,
  dialogForm: optionForm,
});

const { GenericViewVue } = GenericView<Option>();
</script>
