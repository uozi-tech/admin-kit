const config = {
  siteTitle: 'Admin Dashboard',
  copyright: 'Uozi-Tech',
}

export function setAppConfig(newConfig: Partial<typeof config>) {
  Object.assign(config, newConfig)
}

export function getAppConfig() {
  return config
}
