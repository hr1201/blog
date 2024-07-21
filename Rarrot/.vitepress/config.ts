import { DefaultTheme, defineConfig, UserConfig } from 'vitepress';
// import sidebarAuto from './sidebarAuto'
// 用于生成sitemap
import { createContentLoader } from 'vitepress';
import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { nav } from './configs/nav';
import { pwa } from './configs/pwa';
import { algolia } from './configs/algolia';
import { sidebar } from './configs/sidebar';
import { FileHMR } from './configs/watchfiles';
import { withPwa } from '@vite-pwa/vitepress';

interface Link {
  url: string;
  lastmod: number | undefined;
}

const links: Link[] = [];
const isProduction = process.env.NODE_ENV === 'production';

let config = defineConfig({
  title: 'Rarrot',
  description: 'Rarrot的个人博客网站',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'baidu-site-verification', content: 'codeva-90hqhBZdbA' }]
  ],
  lastUpdated: true,
  // cleanUrls: true,

  markdown: {
    lineNumbers: true,
    // https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
    // theme: 'one-dark-pro',
    math: true
  },

  // 用于生成sitemap
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id)) {
      links.push({
        url: pageData.relativePath.replace(/\/index\.md$/, '/').replace(/\.md$/, '.html'),
        lastmod: pageData.lastUpdated
      });
    }
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: 'https://www.rarrot.ren/'
    });
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
    await new Promise((r) => writeStream.on('finish', r));
  },

  themeConfig: {
    // logo: {
    //   light: '/logo-light.svg',
    //   dark: '/logo-dark.svg',
    // },
    logo: '/titleImg-120.png',

    // https://vitepress.dev/reference/default-theme-config
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2023.4-${new Date().getFullYear()}.${new Date().getMonth() + 1}`
    },
    algolia: algolia?.options as DefaultTheme.AlgoliaSearchOptions,

    lastUpdatedText: '更新日期',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '主题',
    outline: [2, 3],
    outlineTitle: '本页目录',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    editLink: {
      pattern: 'https://github.com/hr1201/hr1201.github.io/blob/main/Rarrot/:path',
      text: '在GitHub编辑此页'
    },
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/Bad7NNcr' },
      { icon: 'github', link: 'https://github.com/hr1201' },
      { icon: 'twitter', link: 'https://twitter.com/hungrng75647520' }
      // 自定义社交连接
      // {
      //  icon: {
      //   svg: '<svg role="img" viewBox="0 0 24 24" xmlns="SVG namespace"><title>Dribbble</title><path d="M12...6.38z"/></svg>',
      //  },
      //  link: "...",
      // },
    ],
    nav: nav,
    sidebar: sidebar
  },
  vite: {
    plugins: [FileHMR()]
  },
  pwa: pwa
});

if (isProduction) {
  config = await withPwa(config) as UserConfig<DefaultTheme.Config>;
}

export default config;
