const userAgents = [
  {
    title: 'User Agent',
    values: [
      {
        title: 'ON',
        value:
          'Mozilla/5.0 (X11; CrOS aarch64 13099.85.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4',
        metadata: {
          brands: [
            { brand: 'Not A;Brand', version: '99' },
            { brand: 'Chromium', version: '%s' },
            { brand: 'Google Chrome', version: '%s' },
          ],
          fullVersion: '%s',
          platform: 'Windows',
          platformVersion: '10.0',
          architecture: 'x86',
          model: '',
          mobile: false,
        },
      },
    ],
  },
]

export default userAgents