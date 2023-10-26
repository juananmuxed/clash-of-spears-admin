<template>
  <template v-if="menu.children?.length">
    <QExpansionItem
      :icon="menu.icon"
      :label="$t(menu.titleTag)"
      :content-inset-level="insetLevel"
      header-class="text-secondary"
      expand-icon-class="text-secondary"
    >
      <QList>
        <template v-for="(submenu, _indexSub) in menu.children" :key="'menu' + _indexSub + '-submenu'">
          <MenuParent :menu="submenu" :inset-level="0.2" />
        </template>
      </QList>
    </QExpansionItem>
  </template>
  <MenuItem v-else :menu="menu" />
</template>

<script setup lang="ts">
import MenuItem from 'src/components/menu/MenuItem.vue';
import { IMenuItem } from 'src/router/MenuRoutes';

defineProps({
  menu: { type: Object as PropType<IMenuItem>, required: true },
  insetLevel: { type: Number, default: 0.5 },
});

</script>
