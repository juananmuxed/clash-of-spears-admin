<script setup lang="ts">
import GenericView from 'src/components/common/GenericView.vue';
import { useWeapons } from 'src/composables/client/UseWeapons';
import { GenericViewKey } from 'src/types/Symbols';

const weapons = useWeapons();

provide(GenericViewKey, {
  tableService: weapons.getWeaponsPaginated
})
</script>

<template>
  <GenericView />
</template>
