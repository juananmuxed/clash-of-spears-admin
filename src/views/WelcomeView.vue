<template>
  <QCard class="q-ma-xl">
    <QCardSection>
      <h3>⚔️ {{ $t("common.titles.adminForClash") }} ⚔️</h3>
      <h5>{{ $t("common.titles.welcome") }}</h5>
      <p v-html="$t('common.texts.welcome01')"></p>
      <p v-html="$t('common.texts.welcome02')"></p>
      <h5>{{ $t("common.titles.expansionsAvailable") }}</h5>
      <ul>
        <li>Clash of Spears</li>
        <li>Fields of Blood</li>
        <li>Rise of Eagles</li>
        <li>Clash of Katanas</li>
      </ul>
      <h5>{{ $t("common.titles.componentsWebs") }}</h5>
      <ul>
        <li v-html="$t('common.texts.webs01')"></li>
      </ul>
      <h5>{{ $t("common.titles.news") }}</h5>
      <ul>
        <li v-html="$t('common.texts.news01')"></li>
      </ul>
      <p
        v-html="
          $t('common.texts.listAllChanges', {
            url: 'https://github.com/juananmuxed/clash-of-spears-admin/blob/main/CHANGELOG.md',
          })
        "
      ></p>
    </QCardSection>
  </QCard>
</template>

<script setup lang="ts">

</script>
