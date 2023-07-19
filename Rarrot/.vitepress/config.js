import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rarrot",
  description: "Rarrot的个人博客网站",
  lastUpdated: true,
  cleanUrls: true,
  
  themeConfig: {
    logo: "https://cdn.staticaly.com/gh/hr1201/img@main/imgs/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230508210154.jpg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'blog', link: '/articles/hello' }
    ],
    themeConfig: {
      subSidebar: 'auto'
    },
    sidebar: {
      // 定义"/articles/" 将此配置为路径，只有包含这个路径的才会出现侧边栏
      "/articles/": [
        {
          text: 'JavaScript',
          collapsible: true,
          collapsed:true,
          items: [
            { text: '生成器', link: '/articles/iterable' },
            { text: '迭代器与生成器总结', link: '/articles/iterator' }

          ]
        },
        {
          text: 'Vue',
          collapsible: true,
          collapsed:true,
          items: [
            { text: 'Vue3基础语法', link: '/articles/vuesyntax' },
            { text: 'Vue核心虚拟DOM和diff算法', link: '/articles/vnodediff' },
            { text: '页面刷新store数据丢失', link: '/articles/losestore' }

          ]
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hr1201/hr1201.github.io' },
      { icon: "twitter", link: "https://twitter.com/home" },
      // 自定义社交连接
      // {
      //   icon: {
      //     svg: '<svg role="img" viewBox="0 0 24 24" xmlns="SVG namespace"><title>Dribbble</title><path d="M12...6.38z"/></svg>',
      //   },
      //   link: "...",
      // },
    ]
  }
})
