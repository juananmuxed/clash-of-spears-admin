<template>
  <div class="constrained bg-grey-2">
    <QLayout view="hHh lpR fFf">
      <QHeader elevated class="text-white">
        <QToolbar>
          <QBtn
            flat
            round
            icon="fas fa-bars"
            class="q-mr-sm"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
          <QToolbarTitle>{{ $t('common.titles.adminForClash') }}</QToolbarTitle>
          <QBtn
            v-if="availableLocales.length !== 1"
            flat
            round
            dense
            icon="fas fa-earth"
            class="q-ml-sm"
          >
            <QMenu>
              <QList>
                <QItem
                  v-for="lang in availableLocales"
                  clickable
                  v-close-popup
                  @click="loadLanguageAsync(lang.value)"
                >
                  <QItemSection>{{ lang.label }}</QItemSection>
                </QItem>
              </QList>
            </QMenu>
          </QBtn>
        </QToolbar>
      </QHeader>

      <QDrawer
        show-if-above
        v-model="leftDrawerOpen"
        @before-hide="leftDrawerOpen = false"
        content-class="bg-white"
        :width="280"
      >
        <QList nav>
          <template v-for="(menu, _index) in getMenu()" :key="_index + '-menu'">
            <MenuParent :menu="menu" />
          </template>
        </QList>
      </QDrawer>

      <QPageContainer class="bg-grey-2">
        <RouterView v-slot="{ Component, route }">
          <Transition name="fade-fast" mode="out-in">
            <div :key="route.fullPath" class="w-full">
              <Component :is="Component" />
            </div>
          </Transition>
        </RouterView>
      </QPageContainer>

      <QFooter elevated class="text-white">
        <QToolbar>
          <QSpace />
            <div>
              <QBtn round icon="fa-brands fa-github" flat :href="'https://github.com/' + configPackage.repository" target="_blank"  color="white" />
              <QBadge :label="configPackage.version" color="grey" class="q-mx-sm"></QBadge>
              <QBtn rounded size="sm" flat :label=" new Date().getFullYear() + ' ' + 'MuXeD'" href="https://muxed.dev/" target="_blank" />
            </div>
        </QToolbar>
      </QFooter>
    </QLayout>
  </div>
</template>

<script setup lang="ts">
import configPackage from "../../package.json";
import { ref } from "vue";
import { loadLanguageAsync, availableLocales } from "src/plugins/I18n";
import { getMenu } from "src/router/MenuRoutes";

const leftDrawerOpen = ref(true);
</script>
