import React from 'react'
import { Flex, Link } from 'theme-ui'

const Footer = () => {
  return (
    <Flex
      sx={{
        fontSize: '12px',
        color: 'darkGrey',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Flex sx={{ justifyContent: 'space-around', width: '100%' }}>
        <Link
          href="https://chromewebstore.google.com/detail/tinf0il-go/cfdecfkfhbchnoghljebdkfkofpjmhff/reviews"
          target="_blank"
          variant="footer"
        >
          Rate
        </Link>
        <Link
          href="https://discord.gg/aluminum"
          target="_blank"
          variant="footer"
        >
          Discord
        </Link>
        <Link
          href="https://github.com/Aluminum-Depot/Tinf0il-Go"
          target="_blank"
          variant="footer"
        >
          Github
        </Link>
      </Flex>
    </Flex>
  )
}

export default Footer