import type { Preview } from '@storybook/vue3'
import { themes } from '@storybook/theming'

import '../src/shared/ui/styles/index.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000'
        }
      ]
    },
    darkMode: {
      dark: { ...themes.dark, appBg: 'black' }
    }
  },
  tags: ['autodocs'],
  initialGlobals: {
    backgrounds: { value: 'dark' }
  }
}

export default preview
