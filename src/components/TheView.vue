<script lang="ts" setup>
import { useLoadingBar } from 'naive-ui'
import router from '@/router'

const loadingBar = useLoadingBar()

router.beforeEach(() => loadingBar.start())
router.afterEach(() => loadingBar.finish())
</script>
<template>
  <router-view></router-view>
</template>
