<script setup lang="ts">
import { Button } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { BadgeText, ServiceMessage } from '@/serviceWorker/types'
import { UseDraggable as Draggable } from '@vueuse/components'

const handleRef = ref<HTMLDivElement>()
const counter = ref(0)
const show = ref(false)
const floatSize = ref({ width: 156, height: 128 })

const winWidth = innerWidth
const winHeight = innerHeight

chrome.runtime.onMessage.addListener((request: ServiceMessage, _sender, _sendRequest) => {
  show.value = request.badgeText === BadgeText.ON
})

onMounted(async () => {
  const bgData = await chrome.storage.local.get('badgeText')
  show.value = bgData.badgeText === BadgeText.ON
})
</script>

<template>
  <Draggable
    class="float"
    :style="{ height: `${floatSize.height}px`, width: `${floatSize.width}px` }"
    v-show="show"
    :initial-value="{ x: winWidth - 24 - floatSize.width, y: winHeight - 24 - floatSize.height }"
    :prevent-default="true"
    :handle="handleRef"
  >
    <div ref="handleRef" class="cursor-move">👋 按住此处拖动!</div>
    <span class="desc">Chrome 插件模版</span>
    <Button type="primary" size="small" @click="counter++">点击-{{ counter }}</Button>
  </Draggable>
</template>

<style lang="scss" scoped>
.float {
  color: black;
  position: fixed;
  background-color: #fff;
  border: 1px solid #4a4a4a;
  border-radius: 6px;
  z-index: 99999;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 12px 0px;
  .cursor-move {
    border-radius: 6px;
    padding: 6px;
    cursor: move;
    border: 1px solid #464646;
    font-size: 14px;
    font-weight: bold;
  }
  .desc {
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
