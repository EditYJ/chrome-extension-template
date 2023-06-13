<script setup lang="ts">
const url = chrome.runtime.getURL('/static/icon.png')
</script>

<template>
  <div class="options">
    <img :src="url" class="logo" />
    <h1>Chrome 插件模版-配置页面</h1>
  </div>
</template>

<style lang="scss" scoped>
.options {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    width: 256px;
    height: 256px;
  }
}
</style>
