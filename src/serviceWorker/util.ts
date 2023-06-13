import { query } from '@/util/chrome/tabs'
import { BadgeText, ServiceMessage } from './types'

export async function changeBadgeText(text: BadgeText, sendToTab = true) {
  await chrome.action.setBadgeText({ text })
  await chrome.storage.local.set({ badgeText: text })

  if (sendToTab) {
    const [tab] = await query({ active: true, lastFocusedWindow: true })
    if (tab.id) {
      const a = await chrome.tabs.sendMessage<ServiceMessage, boolean>(tab.id, { badgeText: text })
      console.log(a)
    }
  }
}
