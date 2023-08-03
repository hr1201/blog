// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import containers from './components/container.vue'
import homeBackground from './components/homeBackground.vue'
import test from './components/test.vue'
import findCount from './components/findCount.vue'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
			"doc-after": () => h(containers),
      "doc-footer-before":()=>h(findCount)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app
      .component('containers', containers)
      .component('homeBackground', homeBackground)
      .component('test', test)
      .component('findCount',findCount)
  }
}
