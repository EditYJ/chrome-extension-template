import { BadgeText } from './types'
import { changeBadgeText } from './util'

chrome.runtime.onInstalled.addListener(async () => {
  await changeBadgeText(BadgeText.OFF, false)
})

chrome.runtime.onMessage.addListener((m, s) => {
  console.log('我是service_worker, 我收到了消息：', m, s)
})
