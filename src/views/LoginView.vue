<template>
  <QLayout view="lHh Lpr fff">
    <QCard rounded class="q-pa-md">
      <QCardSection
        ><h5>{{ $t("common.titles.adminForClash") }}</h5></QCardSection
      >
      <QForm @submit.prevent="user.login">
        <QCardSection class="q-gutter-md" style="max-width: 300px">
            <QInput
              v-model="user.userLogin.email"
              outlined
              :rules="[rules.isRequired, rules.isEmail]"
              name="email"
              class="q-mb-md"
              type="text"
            />
            <QInput
              v-model="user.userLogin.password"
              outlined
              type="password"
              :rules="[rules.isRequired]"
            />
            <QBtn type="submit" :label="$t('common.buttons.login')" color="primary" />
        </QCardSection>
      </QForm>
    </QCard>
  </QLayout>
</template>

<script setup lang="ts">
import { useUserStore } from "src/stores/UseUserStore";
import { useRules } from "src/composables/UseRules";

const user = useUserStore();
const rules = useRules();
</script>
