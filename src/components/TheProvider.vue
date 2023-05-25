<script setup lang="ts">
import { GlobalThemeOverrides, zhCN, dateZhCN } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    infoColor: '#09A6FF',
    primaryColor: '#09A6FF',
    primaryColorHover: '#09A6FF',
    primaryColorPressed: '#09A6FF'
  },
  Input: {
    borderFocus: '1px solid #09A6FF',
    borderHover: '1px solid #09A6FF'
  },
  Pagination: {
    itemColor: '#fff',
    itemTextColorHover: '#fff',
    itemTextColorActive: '#fff',
    itemBorderHover: '#3F9BE8',
    itemColorActiveHover: '#3F9BE8',
    itemColorHover: '#3F9BE8',
    itemColorActive: '#3F9BE8',
    itemBorderActive: '#3F9BE8',
    buttonColor: '#fff',
    buttonColorHover: '#3F9BE8',
    buttonBorderHover: '#3F9BE8',
    buttonIconColorHover: '#fff'
  }
}
</script>
<template>
  <n-config-provider :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
    <n-dialog-provider>
      <n-message-provider>
        <n-loading-bar-provider>
          <slot></slot>
        </n-loading-bar-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>
