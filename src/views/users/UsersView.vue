<template>
  <GenericViewVue
    :columns="columns"
    :title="$t('common.titles.users', 2)"
    :dialog-title="$t('common.titles.users', 1)"
  />
</template>

<script setup lang="ts">
import { GenericView } from 'src/components/common/GenericView';
import { useUsers } from 'src/composables/client/UseUsers';
import { User } from 'src/models/api/Users';
import { GenericViewKey } from 'src/types/Symbols';
import { userForm, columns } from './TableData'

const users = useUsers();

provide<GenericView<User>>(GenericViewKey, {
  tableService: users.getUsersPaginated,
  createService: users.createUser,
  updateService: users.updateUser,
  removeService: users.deleteUser,
  dialogForm: userForm,
});

const { GenericViewVue } = GenericView<User>();
</script>
