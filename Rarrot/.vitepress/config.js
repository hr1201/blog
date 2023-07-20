import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Rarrot",
  description: "Rarrot的个人博客网站",
  base: '/blog/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
    // https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
    // theme: 'one-dark-pro',
  },
  themeConfig: {
    // logo: {
    //   light: '/logo-light.svg',
    //   dark: '/logo-dark.svg',
    // },
    logo: "https://cdn.staticaly.com/gh/hr1201/img@main/imgs/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230508210154.jpg",

    // https://vitepress.dev/reference/default-theme-config
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2023.4-${new Date().getFullYear()}.${new Date().getMonth() + 1}`,
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    lastUpdatedText: '更新日期',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    darkModeSwitchLabel: '主题',
    outline:[2,3],
    outlineTitle: '索引',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    editLink: {
      pattern: 'https://github.com/hr1201/hr1201.github.io/blob/main/Rarrot/:path',
      text: '在GitHub编辑此页',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hr1201/hr1201.github.io' },
      { icon: "twitter", link: "https://twitter.com/home" },
      // 自定义社交连接
      // {
      //  icon: {
      //   svg: '<svg role="img" viewBox="0 0 24 24" xmlns="SVG namespace"><title>Dribbble</title><path d="M12...6.38z"/></svg>',
      //  },
      //  link: "...",
      // },
    ],
    nav: [
      // { text: 'Home', link: '/' },
      { text: 'blog', link: '/articles/hello' }
    ],
    sidebar: {
      // 定义"/articles/" 将此配置为路径，只有包含这个路径的才会出现侧边栏
      "/articles/": [
        {
          text: 'JavaScript',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '生成器', link: '/articles/iterable' },
            { text: '迭代器与生成器总结', link: '/articles/iterator' }
          ]
        },
        {
          text: 'Vue',
          collapsible: true,
          collapsed: true,
          items: [
            { text: 'Vue3基础语法', link: '/articles/vuesyntax' },
            { text: 'Vue核心虚拟DOM和diff算法', link: '/articles/vnodediff' },
            { text: '页面刷新store数据丢失', link: '/articles/losestore' }
          ]
        },
      ],
    },
  },
})