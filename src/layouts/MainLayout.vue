<template>
  <QLayout view="hHh lpR fFf">
    <QHeader elevated class="text-white">
      <QToolbar>
        <QBtn flat round icon="fas fa-bars" class="q-mr-sm" @click="switchDrawer" />
        <QToolbarTitle>{{ $t("common.titles.adminForClash") }}</QToolbarTitle>
        <QBtn icon="fas fa-user" round flat>
          <QMenu transition="jump-up">
            <QList>
              <QItem>
                <QItemSection>
                  <QItemLabel>{{ user.tokenPayload?.username }}</QItemLabel>
                  <QItemLabel caption>{{ user.tokenPayload?.email }}</QItemLabel>
                </QItemSection>
              </QItem>
              <QSeparator />
              <QItem v-if="moreThanOneLocales">
                <QItemSection>
                  <QSelect
                    v-model="lang"
                    dense
                    borderless
                    :options="availableLocales"
                  >
                    <template #prepend>
                      <QImg width="1.4rem" fit="contain" :src="lang?.avatar" class="mr-2" />
                    </template>
                    <template #option="scope">
                      <QItem v-bind="scope.itemProps">
                        <QItemSection avatar>
                          <QImg width="2rem" fit="contain" :src="scope.opt.avatar" />
                        </QItemSection>
                        <QItemSection>
                          {{ scope.opt.label }}
                        </QItemSection>
                      </QItem>
                    </template>
                  </QSelect>
                </QItemSection>
              </QItem>
              <QItem clickable @click="$q.dark.toggle">
                <QItemSection avatar>
                  <QIcon
                    :name="!$q.dark.isActive ? 'fas fa-lightbulb' : 'far fa-lightbulb'"
                  />
                </QItemSection>
                <QItemSection>
                  {{
                    $q.dark.isActive
                      ? $t("common.buttons.dark")
                      : $t("common.buttons.light")
                  }}
                </QItemSection>
              </QItem>
              <QItem
                v-close-popup
                clickable
                @click="
                  user.logout({ type: 'info', message: $t('success.logoutSuccess') })
                "
              >
                <QItemSection avatar>
                  <QIcon name="fas fa-right-from-bracket" />
                </QItemSection>
                <QItemSection>
                  {{ $t("common.buttons.logout") }}
                </QItemSection>
              </QItem>
            </QList>
          </QMenu>
        </QBtn>
      </QToolbar>
    </QHeader>

    <QDrawer
      show-if-above
      v-model="leftDrawerOpen"
      content-class="bg-white"
      :width="280"
      bordered
      mini-to-overlay
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :mini="!leftDrawerOpen || miniState"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <QScrollArea class="fit">
        <QList nav padding>
          <template v-for="(menu, _index) in getMenu()" :key="_index + '-menu'">
            <MenuParent :menu="menu" />
          </template>
        </QList>
      </QScrollArea>
    </QDrawer>

    <QPageContainer>
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
          <QBtn
            round
            icon="fa-brands fa-github"
            flat
            :href="'https://github.com/' + configPackage.repository"
            target="_blank"
            color="white"
          />
          <QBadge :label="configPackage.version" color="grey" class="q-mx-sm"></QBadge>
          <QBtn
            rounded
            size="sm"
            flat
            :label="new Date().getFullYear() + ' ' + 'MuXeD'"
            href="https://muxed.dev/"
            target="_blank"
          />
        </div>
      </QToolbar>
    </QFooter>
  </QLayout>
</template>

<script setup lang="ts">
import configPackage from "../../package.json";
import { ref } from "vue";
import { loadLanguageAsync, availableLocales } from "src/plugins/I18n";
import { getMenu } from "src/router/MenuRoutes";
import { useQuasar } from "quasar";
import { useUserStore } from "src/stores/UseUserStore";
import { LOCAL_STORAGE } from "src/constants/Keys";

const $q = useQuasar();
const user = useUserStore();

const miniState = ref(true);
const leftDrawerOpen = ref(false);

function switchDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const langToken = localStorage.getItem(LOCAL_STORAGE.LANG) || 'en';

const lang = ref(availableLocales.find((locale) => locale.value === langToken));

const moreThanOneLocales = computed(() => availableLocales.length > 1);

watch(lang, (newValue) => {
  loadLanguageAsync(newValue?.value || 'en');
});
</script>
