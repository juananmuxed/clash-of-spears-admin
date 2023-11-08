<template>
  <QLayout view="lHh Lpr fff" class="background-gradient">
    <QCard class="absolute-center shadow-18">
      <QCardSection class="bg-teal-2">
        <div class="text-h5">
          {{ $t("common.titles.adminForClash") }}
        </div>
      </QCardSection>
      <QForm @submit.prevent="user.login">
        <QCardSection>
          <div class="q-gutter-md">
            <QInput
              v-model="user.userLogin.email"
              outlined
              rounded
              :rules="[rules.isRequired, rules.isEmail]"
              name="email"
              :label="$t('common.labels.email')"
              type="text"
            />
            <QInput
              v-model="user.userLogin.password"
              outlined
              rounded
              :type="passwordShow ? 'text' : 'password'"
              :label="$t('common.labels.password')"
              :rules="[rules.isRequired]"
            >
              <template v-slot:append>
                <QBtn
                  round
                  dense
                  flat
                  :icon="passwordShow ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  @click="switchPassword"
                />
              </template>
            </QInput>
          </div>
        </QCardSection>
        <QSeparator size="12px" />
        <QCardActions align="center">
          <QBtn
            type="submit"
            :label="$t('common.buttons.login')"
            color="positive"
            rounded
            unelevated
            padding="sm xl"
            :loading="user.isLoading"
          >
            <template v-slot:loading>
              <QSpinnerGears />
            </template>
          </QBtn>
        </QCardActions>
      </QForm>
    </QCard>
  </QLayout>
</template>

<script setup lang="ts">
import { useUserStore } from "src/stores/UseUserStore";
import { useRules } from "src/composables/UseRules";

const user = useUserStore();
const rules = useRules();

const passwordShow = ref(false);

function switchPassword() {
  passwordShow.value = !passwordShow.value;
}
</script>

<style lang="sass">
.background-gradient
  background: linear-gradient(150deg, $primary 0%, $secondary 35%, $accent 100%)
</style>
