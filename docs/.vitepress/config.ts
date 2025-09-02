import { withMermaid } from 'vitepress-plugin-mermaid'
import shared from './shared'
import zh from './zh'

export default withMermaid({
  ...shared,

  locales: {
    root: {
      label: '简',
      ...zh,
    },
  },
})
