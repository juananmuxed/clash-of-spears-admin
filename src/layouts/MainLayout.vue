<template>
  <div class="constrained bg-grey-2">
    <QLayout view="hHR lpr lfr">
      <QHeader bordered class="bg-white text-primary">
        <QToolbar>
          <QBtn
            flat
            round
            dense
            icon="fas fa-bars"
            class="q-mr-sm"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
          <QToolbarTitle>Vue3 Template</QToolbarTitle>
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
        :width="320"
      >
        Set menu
      </QDrawer>

      <QPageContainer class="bg-grey-2">
        <RouterView />
      </QPageContainer>
    </QLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { loadLanguageAsync, availableLocales } from "src/plugins/I18n";

const leftDrawerOpen = ref(true);
</script>
