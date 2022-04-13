<script setup lang="ts"></script>

<template>
  <h1>not-found</h1>
  <router-link v-slot="{ navigate }" to="/" custom>
    <n-button type="primary" @click="navigate">back</n-button>
  </router-link>
</template>

<style scoped></style>
