<script setup lang="ts"></script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade-fast" mode="out-in">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style lang="sass">
#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.4s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0

.fade-fast-enter-active,
.fade-fast-leave-active
  transition: opacity 0.2s ease

.fade-fast-enter-from,
.fade-fast-leave-to
  opacity: 0
</style>
