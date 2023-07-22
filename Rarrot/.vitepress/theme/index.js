// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import containers from './components/container.vue'
import homeBackground from './components/homeBackground.vue'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
			"doc-after": () => h(containers),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app
      .component('containers', containers)
      .component('homeBackground', homeBackground)

  }
}
