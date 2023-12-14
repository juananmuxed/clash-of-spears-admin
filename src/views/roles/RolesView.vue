<template>
  <GenericViewVue
    :columns="columns"
    :title="$t('common.titles.roles', 2)"
    :dialog-title="$t('common.titles.roles', 1)"
  />
</template>

<script setup lang="ts">
import { GenericView } from 'src/components/common/GenericView';
import { useRoles } from 'src/composables/client/UseRoles';
import { Role } from 'src/models/api/Roles';
import { GenericViewKey } from 'src/types/Symbols';
import { roleForm, columns } from './TableData'

const roles = useRoles();

provide<GenericView<Role>>(GenericViewKey, {
  tableService: roles.getRolesPaginated,
  createService: roles.createRole,
  updateService: roles.updateRole,
  removeService: roles.deleteRole,
  dialogForm: roleForm,
});

const { GenericViewVue } = GenericView<Role>();
</script>
