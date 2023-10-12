// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import containers from './components/container.vue'
import findCount from './components/findCount.vue'
import block from './components/animationBlock.vue'
import imagePreview from "./components/imagePreview.vue"

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
			"doc-after": () => h(containers),
      "doc-footer-before":()=>h(findCount),
      "doc-before":()=>h(imagePreview),
    })
  },
  enhanceApp({ app, }:any) {
    app
      .component('containers', containers)
      .component('findCount',findCount)
      .component('block',block)
  },
  // extends({
    
  // })
}
