/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'
import { Flex, Box, Select, Input } from 'theme-ui'
import Header from './Header'
import OptionBox from './OptionBox'
import Footer from './Footer'
import { getUserAgentHeaderRule } from 'utils/changeUserAgent'
import userAgents from 'utils/userAgents'

const Popup = () => {
  const [userAgentInfo, setUserAgentInfo] = useState('browserDefault')
  const [userAgentValue, setUserAgentValue] = useState(navigator.userAgent)

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setActiveTabId(tabs[0].id)
      chrome.storage.local.get([String(tabs[0].id)], (storage) => {
        if (storage[tabs[0].id]) {
          setVolume(storage[tabs[0].id] * 100)
        }
      })
    })

    chrome.storage.local.get(
      [
        'userAgentInfo',
        'userAgentValue',
      ],
      (storage) => {
        storage.userAgentInfo && setUserAgentInfo(storage.userAgentInfo)
        storage.userAgentValue && setUserAgentValue(storage.userAgentValue)
        storage.enableRightClick &&
          setEnableRightClick(storage.enableRightClick)
        storage.enableAggressiveMode &&
          setEnableAggressiveMode(storage.enableAggressiveMode)
        storage.saveImageAsType && setSaveImageAsType(storage.saveImageAsType)
        storage.disableWebRtc && setDisableWebRtc(storage.disableWebRtc)
      }
    )
  }, [])

  useEffect(() => {
    if (userAgentInfo !== 'browserDefault' && userAgentValue) {
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [getUserAgentHeaderRule(userAgentValue)],
        removeRuleIds: [1],
      })
    } else {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
      })
    }
  }, [userAgentInfo, userAgentValue])

  const handleUserAgentInfoChange = (event) => {
    setUserAgentInfo(event.target.value)

    chrome.storage.local.set({
      userAgentInfo: event.target.value,
    })

    if (event.target.value === 'browserDefault') {
      setUserAgentValue(navigator.userAgent)
      chrome.storage.local.set({
        userAgentValue: null,
      })
    } else if (event.target.value !== 'custom') {
      const userAgentObj = JSON.parse(event.target.value)
      setUserAgentValue(userAgentObj.value)
      chrome.storage.local.set({
        userAgentValue: userAgentObj.value,
      })
    }
  }

  const handleUserAgentValueChange = (event) => {
    if (userAgentInfo !== 'custom') {
      setUserAgentInfo('custom')
      chrome.storage.local.set({
        userAgentInfo: 'custom',
      })
    }

    setUserAgentValue(event.target.value)
    chrome.storage.local.set({
      userAgentValue: event.target.value,
    })
  }

  return (
    <Box sx={{ p: '14px' }}>
      <Header />
      <OptionBox
        title="Start Unblocking">
        <Box sx={{ mt: '10px' }}>
          <Select
            value={userAgentInfo}
            onChange={handleUserAgentInfoChange}
            variant="selectInput"
            sx={{
              cursor: 'pointer',
            }}
          >
            <option value="browserDefault">OFF</option>
            {Object.keys(userAgents).flatMap((key) =>
              userAgents[key].values.map((option) => (
                <option key={option.value} value={JSON.stringify(option)}>
                  {option.title}
                </option>
              ))
            )}
          </Select>
        </Box>
      </OptionBox>
      <Footer />
    </Box>
  )
}

export default Popup