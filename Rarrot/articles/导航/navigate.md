---
# https://vitepress.dev/reference/default-theme-home-page
layoutClass: r-nav-layout
outline: [2, 3, 4]
---

<script setup>
import NavLinks from './components/NavLinks.vue'
import { NAV_DATA } from './data'
</script>

<style src="./index.less"></style>

# 前端导航

<NavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>


::: tip 该导航由 maomao 开发，版权声明：https://github.com/maomao1996/vitepress-nav-template ，本站在此基础上添加了icon图标的懒加载。
:::