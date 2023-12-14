<template>
  <QItem
    v-if="user.isValidRole(menu.roles)"
    v-ripple="!!menu.url"
    clickable
    :to="menu.url && {name: menu.url}"
    class="text-secondary"
  >
    <QItemSection v-if="menu.icon" avatar>
      <QIcon :name="menu.icon" color="secondary" />
    </QItemSection>
    <QItemSection>{{ $t(menu.titleTag) }}</QItemSection>
  </QItem>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/UseUserStore';
import { IMenuItem } from 'src/router/MenuRoutes';

const user = useUserStore()

defineProps({
  menu: { type: Object as PropType<IMenuItem>, required: true },
});
</script>
