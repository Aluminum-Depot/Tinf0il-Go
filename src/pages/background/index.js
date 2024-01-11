import { injectUserAgent } from 'utils/changeUserAgent.js'

const executeScript = (tabId, script, args) => {
  chrome.scripting.executeScript({
    target: { tabId, allFrames: true },
    world: 'MAIN',
    injectImmediately: true,
    func: script,
    args: args,
  })
}

const webNavigationHandler = (details) => {
  chrome.storage.local.get(
    ['userAgentValue'],
    (storage) => {
      if (storage.userAgentValue) {
        executeScript(details.tabId, injectUserAgent, [storage.userAgentValue])
      }
    }
  )
}

chrome.webNavigation.onCommitted.addListener(webNavigationHandler)

chrome.webNavigation.onHistoryStateUpdated.addListener(webNavigationHandler)