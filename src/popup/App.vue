<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { BadgeText } from '@/serviceWorker/types'
import { RadioGroup, RadioButton } from 'ant-design-vue'
import { changeBadgeText } from '@/serviceWorker/util'

const url = chrome.runtime.getURL('/static/icon.png')

const badgeText = ref<BadgeText>(BadgeText.OFF)

watch(badgeText, async (v) => {
  await changeBadgeText(v)
  chrome.runtime.sendMessage({ hi: '你好' })
})

onMounted(async () => {
  const bgData = await chrome.storage.local.get('badgeText')
  badgeText.value = bgData.badgeText
})
</script>

<template>
  <div class="popup">
    <img :src="url" />
    <span>Chrome 插件模版</span>
    <RadioGroup v-model:value="badgeText" button-style="solid">
      <RadioButton :value="BadgeText.ON">{{ BadgeText.ON }}</RadioButton>
      <RadioButton :value="BadgeText.OFF">{{ BadgeText.OFF }}</RadioButton>
    </RadioGroup>
  </div>
</template>

<style lang="scss" scoped>
.popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 128px;
  height: 128px;
  row-gap: 6px;
  img {
    width: 64px;
    height: 64px;
  }
  span {
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
