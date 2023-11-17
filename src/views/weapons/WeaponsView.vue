<script setup lang="ts">
import { useWeapons } from "src/composables/client/UseWeapons";
import { GenericViewKey } from "src/types/Symbols";
import { columns, weaponForm } from "./TableData";
import { Weapon } from "src/models/api/Weapons";
import { GenericView } from "src/components/common/GenericView";

const weapons = useWeapons();

provide<GenericView<Weapon>>(GenericViewKey, {
  tableService: weapons.getWeaponsPaginated,
  createService: weapons.createWeapon,
  updateService: weapons.updateWeapon,
  removeService: weapons.deleteWeapon,
  dialogForm: weaponForm
});

const { GenericViewVue } = GenericView<Weapon>();
</script>

<template>
  <GenericViewVue
    :columns="columns"
    :title="$t('common.titles.weapons', 2)"
    :dialog-title="$t('common.titles.weapons', 1)"
  />
</template>
