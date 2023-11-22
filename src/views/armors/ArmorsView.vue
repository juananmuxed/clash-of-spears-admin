<template>
  <GenericViewVue
    :columns="columns"
    :title="$t('common.titles.armors', 2)"
    :dialog-title="$t('common.titles.armors', 1)"
  />
</template>

<script setup lang="ts">
import { GenericView } from 'src/components/common/GenericView';
import { useArmors } from 'src/composables/client/UseArmors';
import { Armor } from 'src/models/api/Armors';
import { GenericViewKey } from 'src/types/Symbols';
import { armorForm, columns } from './TableData'

const armors = useArmors();

provide<GenericView<Armor>>(GenericViewKey, {
  tableService: armors.getArmorsPaginated,
  createService: armors.createArmor,
  updateService: armors.updateArmor,
  removeService: armors.deleteArmor,
  uploadService: armors.postArmorsBulk,
  dialogForm: armorForm,
});

const { GenericViewVue } = GenericView<Armor>();
</script>
