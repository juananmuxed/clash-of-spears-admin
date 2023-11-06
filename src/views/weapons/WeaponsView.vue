<script setup lang="ts">
import { useWeapons } from 'src/composables/client/UseWeapons';
import { GenericViewKey } from 'src/types/Symbols';
import { columns } from './TableData'

const weapons = useWeapons();

provide(GenericViewKey, {
  tableService: weapons.getWeaponsPaginated
})
</script>

<template>
  <GenericView :columns="columns" />
</template>
